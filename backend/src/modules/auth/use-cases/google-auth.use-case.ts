import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { GoogleUser } from '../interfaces/google-user.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GoogleAuthUseCase {
  private readonly logger = new Logger('GoogleAuthUseCase');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(googleUser: GoogleUser) {
    const { email, firstName, lastName } = googleUser;

    try {
      // Verificar si el usuario ya existe
      let user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Crear nuevo usuario si no existe
        const name = `${firstName} ${lastName}`;

        user = await this.prismaService.user.create({
          data: {
            email,
            name,
            password: '', // Para usuarios de Google, no necesitamos password
            isActive: true,
          },
        });

        this.logger.log(`New Google user created: ${email}`);
      }

      // Remover password antes de retornar
      const { password: _, ...userWithoutPassword } = user;
      void _; // Ignorar variable no usada

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handlerDBExceptions(error: any): never {
    if (error.code === '23505')
      throw new InternalServerErrorException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

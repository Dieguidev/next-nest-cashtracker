import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) throw new UnauthorizedException('Credentials are not valid');

      if (!user.confirmed) throw new ForbiddenException('Email not confirmed');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid');

      // Remover password antes de retornar
      const { password: _, ...userWithoutPassword } = user;
      void _; // Ignorar variable no usada

      return {
        user: userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Error processing login request');
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { generateSixDigitToken } from 'src/utils/generateSixDigitToken';
import { SendVerificationEmailUseCase } from 'src/modules/email/use-cases';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger('CreateUserUseCase');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const verificationToken = generateSixDigitToken();

      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          password: bcrypt.hashSync(password, 10),
          token: verificationToken,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Remover password antes de retornar
      // const { password: _, ...userWithoutPassword } = user;
      // void _; // Ignorar variable no usada
      await this.sendVerificationEmailUseCase.execute(
        user.name,
        user.email,
        verificationToken,
      );

      return {
        user,
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
    if (error.code === 'P2002') {
      // Prisma unique constraint error
      const target = error.meta?.target;

      if (target?.includes('email')) {
        throw new BadRequestException('Email already exists');
      }

      // if (target?.includes('slug')) {
      //   throw new BadRequestException('Slug already exists');
      // }

      throw new BadRequestException('Unique constraint violation');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Something went wrong');
  }
}

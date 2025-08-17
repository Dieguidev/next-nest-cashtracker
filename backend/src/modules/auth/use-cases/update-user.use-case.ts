import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: User['id'], updateUserDto: UpdateUserDto) {
    const { email, name } = updateUserDto;

    try {
      const existEmail = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existEmail?.id !== userId) {
        throw new ConflictException('Email already exists');
      }

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { email, name },
      });
      return user;
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException('Error updating user');
    }
  }
}

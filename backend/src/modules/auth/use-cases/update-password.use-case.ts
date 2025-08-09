import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from '../dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword, confirmNewPassword } =
      updatePasswordDto;
    console.log(currentPassword, newPassword, confirmNewPassword);
    console.log(user);

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException(
        'New password and confirmation do not match',
      );
    }

    try {
      // Validar que currentPassword y user.password existan
      if (!currentPassword) {
        throw new BadRequestException('Current password is required');
      }

      if (!user.password) {
        throw new InternalServerErrorException('User password not found');
      }

      if (!bcrypt.compareSync(currentPassword, user.password))
        throw new UnauthorizedException('Credentials are not valid');

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      console.log(hashedPassword);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return {
        success: true,
        message: 'Password updated successfully',
      };
    } catch (error) {
      console.log(error);

      if (error instanceof BadRequestException) throw error;
      if (error instanceof UnauthorizedException) throw error;

      throw new InternalServerErrorException('Error updating user');
    }
  }
}

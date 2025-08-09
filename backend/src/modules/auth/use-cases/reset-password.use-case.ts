import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResetPasswordDto } from '../dto';

@Injectable()
export class ResetPasswordUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(resetPasswordDto: ResetPasswordDto, token: string) {
    const { newPassword } = resetPasswordDto;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          token,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      await this.prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          password: bcrypt.hashSync(newPassword, 10),
          token: null,
        },
      });

      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error resetting password');
    }
  }
}

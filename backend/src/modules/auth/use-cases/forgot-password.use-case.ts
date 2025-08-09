import { PrismaService } from 'src/prisma/prisma.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { generateSixDigitToken } from 'src/utils/generateSixDigitToken';
import { SendPasswordResetEmailUseCase } from 'src/modules/email/use-cases';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sendPasswordResetEmailUseCase: SendPasswordResetEmailUseCase,
  ) {}

  async execute(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { name: true, email: true, isActive: true },
      });
      console.log(user);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newToken = generateSixDigitToken();

      await this.sendPasswordResetEmailUseCase.execute(
        user.name,
        user.email,
        newToken,
      );
      await this.prisma.user.update({
        where: { email: email },
        data: { token: newToken },
      });

      return {
        success: true,
        message: 'Password reset email sent successfully',
      };
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error processing forgot password request',
      );
    }
  }
}

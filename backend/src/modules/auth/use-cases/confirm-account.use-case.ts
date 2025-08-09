import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfirmAccountDto } from '../dto/confirm-account.dto';

@Injectable()
export class ConfirmAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(confirmAccountDto: ConfirmAccountDto) {
    try {
      const { token } = confirmAccountDto;
      const user = await this.prisma.user.findFirst({ where: { token } });
      if (!user) throw new BadRequestException('Invalid token');

      if (user.token !== token) throw new BadRequestException('Invalid token');

      await this.prisma.user.update({
        where: { id: user.id },
        data: { confirmed: true, token: null },
      });

      return { success: true, message: 'Account confirmed successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Error confirming account');
    }
  }
}

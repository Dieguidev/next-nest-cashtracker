import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ValidateTokenDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(validateTokenDto: ValidateTokenDto) {
    const { token } = validateTokenDto;
    try {
      const tokenExists = await this.prisma.user.findFirst({
        where: { token },
        select: { id: true },
      });

      if (!tokenExists) {
        throw new NotFoundException('Token no valid');
      }
      return {
        success: true,
        message: 'Token is valid',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error confirming account');
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteBudgetByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      await this.prisma.budget.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);

      // Si el registro no existe, Prisma lanza un error P2025
      if (error.code === 'P2025') {
        throw new BadRequestException(`Budget with ID ${id} not found`);
      }

      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}

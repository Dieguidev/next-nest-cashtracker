import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetBudgetByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const budget = await this.prisma.budget.findUnique({
        where: { id },
      });
      if (!budget) {
        throw new BadRequestException(`Budget with ID ${id} not found`);
      }
      return { success: true, data: budget };
    } catch (error) {
      // Si es una excepción de NestJS (como BadRequestException), la re-lanzamos
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Solo capturamos errores reales de la base de datos
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}

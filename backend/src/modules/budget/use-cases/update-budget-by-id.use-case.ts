import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBudgetDto } from '../dto/update-budget.dto';

@Injectable()
export class UpdateBudgetByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, updateBudgetDto: UpdateBudgetDto) {
    try {
      const budget = await this.prisma.budget.update({
        where: { id },
        data: updateBudgetDto,
      });
      return { success: true, data: budget };
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

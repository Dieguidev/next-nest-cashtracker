import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateExpenseDto } from '../dto/update-expense.dto';

@Injectable()
export class UpdateExpenseUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, updateExpenseDto: UpdateExpenseDto) {
    try {
      const expense = await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto,
      });
      return { success: true, data: expense };
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

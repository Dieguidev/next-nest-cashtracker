import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ExpenseExistsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id: budgetId, expenseId } = request.params;

    if (!expenseId) {
      throw new BadRequestException('Expense ID is required');
    }

    // Validar que sea un UUID válido
    if (!isUUID(expenseId)) {
      throw new BadRequestException('Expense ID must be a valid UUID');
    }

    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id: expenseId, budgetId },
      });
      request.expense = expense;
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Solo capturamos errores reales de la base de datos
      throw new InternalServerErrorException(
        'Database error while validating budget',
      );
    }
  }
}

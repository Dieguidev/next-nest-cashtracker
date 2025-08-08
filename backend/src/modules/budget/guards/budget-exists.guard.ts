import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BudgetEntity } from '../entities/budget.entity';

@Injectable()
export class BudgetExistsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const budgetId = request.params.id;

    if (!budgetId) {
      throw new BadRequestException('Budget ID is required');
    }

    try {
      const budgetData = await this.prisma.budget.findUnique({
        where: { id: budgetId },
      });

      if (!budgetData) {
        throw new BadRequestException(`Budget with ID ${budgetId} not found`);
      }

      // Convertimos los datos de Prisma a BudgetEntity usando el método fromPrisma
      const budget = BudgetEntity.fromPrisma(budgetData);

      // Agregamos el budget al request para que esté disponible en el controlador
      request.budget = budget;
      return true;
    } catch (error) {
      // Si es una excepción de NestJS, la re-lanzamos
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

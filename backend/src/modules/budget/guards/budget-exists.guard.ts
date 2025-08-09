import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class BudgetExistsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const budgetId = request.params.id;
    const userId = request.user.id;

    if (!budgetId) {
      throw new BadRequestException('Budget ID is required');
    }

    // Validar que sea un UUID válido
    if (!isUUID(budgetId)) {
      throw new BadRequestException('Budget ID must be a valid UUID');
    }

    try {
      const budgetData = await this.prisma.budget.findUnique({
        where: { id: budgetId, userId },
        include: {
          expenses: true, // Incluimos las expenses si es necesario
        },
      });

      if (!budgetData) {
        throw new BadRequestException(
          `Budget with ID ${budgetId} does not exist or does not belong to the authenticated user.`,
        );
      }

      // Convertimos los datos de Prisma a BudgetEntity usando el método fromPrisma

      // Agregamos el budget al request para que esté disponible en el controlador
      request.budget = budgetData;
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

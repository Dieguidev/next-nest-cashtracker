import { Module } from '@nestjs/common';

import { BudgetModule } from './modules/budget/budget.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BudgetModule, PrismaModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}

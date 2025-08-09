import { Module } from '@nestjs/common';

import { BudgetModule } from './modules/budget/budget.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [BudgetModule, PrismaModule, AuthModule, EmailModule],
  controllers: [],
  providers: [],
  exports: [PrismaModule, AuthModule],
})
export class AppModule {}

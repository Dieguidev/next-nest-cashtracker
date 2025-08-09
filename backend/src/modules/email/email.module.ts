import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

import {
  SendVerificationEmailUseCase,
  SendPasswordResetEmailUseCase,
} from './use-cases';

@Module({
  controllers: [],
  providers: [
    EmailService,
    SendVerificationEmailUseCase,
    SendPasswordResetEmailUseCase,
  ],
  exports: [
    EmailService,
    SendVerificationEmailUseCase,
    SendPasswordResetEmailUseCase,
  ],
})
export class EmailModule {}

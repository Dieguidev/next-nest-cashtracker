import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { envs } from 'src/config/envs';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  GoogleAuthUseCase,
  ForgotPasswordUseCase,
  ValidateTokenUseCase,
  ResetPasswordUseCase,
  UpdatePasswordUseCase,
  ValidatePasswordUseCase,
} from './use-cases';

import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { ConfirmAccountUseCase } from './use-cases/confirm-account.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    CreateUserUseCase,
    LoginUserUseCase,
    GoogleAuthUseCase,
    ConfirmAccountUseCase,
    ForgotPasswordUseCase,
    ValidateTokenUseCase,
    ResetPasswordUseCase,
    UpdatePasswordUseCase,
    ValidatePasswordUseCase,
  ],
  imports: [
    // ConfigModule,
    EmailModule,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      useFactory: () => {
        return {
          secret: envs.jwtSecret,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}

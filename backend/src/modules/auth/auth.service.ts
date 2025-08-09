import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GoogleUser } from './interfaces/google-user.interface';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  GoogleAuthUseCase,
  ForgotPasswordUseCase,
  ConfirmAccountUseCase,
  ValidateTokenUseCase,
  ResetPasswordUseCase,
  UpdatePasswordUseCase,
} from './use-cases';

import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto, UpdatePasswordDto, ValidateTokenDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly googleAuthUseCase: GoogleAuthUseCase,
    private readonly confirmAccountUseCase: ConfirmAccountUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  async confirmAccount(confirmAccountDto: ConfirmAccountDto) {
    return this.confirmAccountUseCase.execute(confirmAccountDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(forgotPasswordDto);
  }

  async validateToken(validateTokenDto: ValidateTokenDto) {
    return this.validateTokenUseCase.execute(validateTokenDto);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    return this.resetPasswordUseCase.execute(resetPasswordDto, token);
  }

  async updatePassword(user: User, updatePasswordDto: UpdatePasswordDto) {
    return this.updatePasswordUseCase.execute(user, updatePasswordDto);
  }

  async googleAuth(googleUser: GoogleUser) {
    return this.googleAuthUseCase.execute(googleUser);
  }
}

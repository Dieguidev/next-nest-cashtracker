import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GoogleUser } from './interfaces/google-user.interface';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  GoogleAuthUseCase,
} from './use-cases';
import { ConfirmAccountUseCase } from './use-cases/confirm-account.use-case';
import { ConfirmAccountDto } from './dto/confirm-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly googleAuthUseCase: GoogleAuthUseCase,
    private readonly confirmAccountUseCase: ConfirmAccountUseCase,
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

  async googleAuth(googleUser: GoogleUser) {
    return this.googleAuthUseCase.execute(googleUser);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GoogleUser } from './interfaces/google-user.interface';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  GoogleAuthUseCase,
} from './use-cases';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly googleAuthUseCase: GoogleAuthUseCase,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  async googleAuth(googleUser: GoogleUser) {
    return this.googleAuthUseCase.execute(googleUser);
  }
}

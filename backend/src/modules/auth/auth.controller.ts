import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ValidateTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('confirm-account')
  @HttpCode(200)
  confirmAccount(@Body() confirmAccountDto: ConfirmAccountDto) {
    return this.authService.confirmAccount(confirmAccountDto);
  }

  @Get('profile')
  @Auth()
  getUser(@GetUser() user: User) {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('validate-token')
  @HttpCode(200)
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateToken(validateTokenDto);
  }

  @Get('private')
  @Auth()
  testingPrivateRoute() {
    return { message: 'Testing private route' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Este endpoint inicia el flujo de OAuth con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const result = await this.authService.googleAuth(req.user);

      // Redirigir al frontend con el token como parámetro
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      const redirectUrl = `${frontendUrl}/auth/callback?token=${result.token}&user=${encodeURIComponent(JSON.stringify(result))}`;

      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google auth error:', error);
      // En caso de error, redirigir al login con mensaje de error
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      return res.redirect(
        `${frontendUrl}/auth/login?error=authentication_failed`,
      );
    }
  }
}

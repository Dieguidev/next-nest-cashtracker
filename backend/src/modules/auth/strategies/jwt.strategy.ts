import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { envs } from 'src/config/envs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { id } = payload;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    // Crear una copia del usuario sin la contraseña
    const { password, ...userWithoutPassword } = user;
    void password; // Ignorar explícitamente la variable 'password' para evitar el warning

    return userWithoutPassword;
  }
}

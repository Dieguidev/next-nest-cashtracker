import { User } from 'src/modules/auth/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidatePasswordDto } from '../dto';

@Injectable()
export class ValidatePasswordUseCase {
  constructor(private readonly prisma: PrismaService) {}

  execute(
    validatePasswordDto: ValidatePasswordDto,
    userPassword: User['password'],
  ) {
    const { password } = validatePasswordDto;

    if (!bcrypt.compareSync(password, userPassword as string))
      throw new UnauthorizedException('Credentials are not valid');

    return {
      success: true,
    };
  }
}

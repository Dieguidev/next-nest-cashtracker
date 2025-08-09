import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TokenValidationPipe implements PipeTransform {
  transform(value: string) {
    // Validar que el token tenga exactamente 6 dígitos numéricos
    if (!/^\d{6}$/.test(value)) {
      throw new BadRequestException('Token must be exactly 6 numeric digits');
    }
    return value;
  }
}

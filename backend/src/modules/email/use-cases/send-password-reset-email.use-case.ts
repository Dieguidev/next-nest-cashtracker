import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { envs } from 'src/config/envs';

@Injectable()
export class SendPasswordResetEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(
    userEmail: string,
    userName: string,
    token: string,
  ): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hola ${userName},</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Si solicitaste este cambio, utiliza el siguiente enlace para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${envs.frontendUrl}/auth/new-password" style="font-size: 18px; font-weight: bold; color: #dc3545; text-decoration: none;">Restablecer Contraseña</a>
        </div>
        <p style="text-align: center; font-size: 16px; font-weight: bold; color: #333;">Código de verificación: ${token}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.
        </p>
        <p style="color: #666; font-size: 12px;">
          Este código expirará en 24 horas por seguridad.
        </p>
      </div>
    `;

    return this.emailService.sendEmail({
      to: userEmail,
      subject: 'Recuperación de Contraseña - Cash Tracker',
      html: htmlContent,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { envs } from 'src/config/envs';

@Injectable()
export class SendPasswordResetEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(userEmail: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${envs.frontendUrl}/reset-password?token=${resetToken}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Recuperación de Contraseña</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Si solicitaste este cambio, haz clic en el siguiente botón para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p>O copia y pega el siguiente enlace en tu navegador:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.
        </p>
        <p style="color: #666; font-size: 12px;">
          Este enlace expirará en 24 horas por seguridad.
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

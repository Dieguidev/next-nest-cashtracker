import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { envs } from 'src/config/envs';

@Injectable()
export class SendVerificationEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(userEmail: string, token: string): Promise<boolean> {
    const verificationUrl = `${envs.frontendUrl}/verify?token=${token}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">¡Bienvenido a Cash Tracker!</h2>
        <p>Gracias por registrarte en nuestra aplicación.</p>
        <p>Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verificar Correo Electrónico
          </a>
        </div>
        <p>O copia y pega el siguiente enlace en tu navegador:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Si no solicitaste esta cuenta, puedes ignorar este correo.
        </p>
      </div>
    `;

    return this.emailService.sendEmail({
      to: userEmail,
      subject: 'Verifica tu correo electrónico - Cash Tracker',
      html: htmlContent,
    });
  }
}

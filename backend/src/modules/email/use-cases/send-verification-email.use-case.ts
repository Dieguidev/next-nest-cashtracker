import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { envs } from 'src/config/envs';

@Injectable()
export class SendVerificationEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(
    name: string,
    userEmail: string,
    token: string,
  ): Promise<boolean> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">¡Hola, ${name}!</h2>
        <p style="color: #555;">Gracias por registrarte en <strong>Cash Tracker</strong>, la mejor herramienta para gestionar tus finanzas.</p>
        <p style="color: #555;">Para completar tu registro, por favor copia el siguiente código de verificación y pégalo en la página de verificación:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 20px; font-weight: bold; color: #007bff;">${token}</span>
        </div>
        <p style="color: #555;">Accede a la página de verificación en el siguiente enlace:</p>
        <p style="word-break: break-word; color: #007bff; text-align: center;">
          <a href="${envs.frontendUrl}/auth/confirm-account" style="text-decoration: none; color: #007bff;">${envs.frontendUrl}/auth/confirm-account</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
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

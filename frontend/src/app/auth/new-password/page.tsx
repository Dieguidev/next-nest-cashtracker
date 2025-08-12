
import { PasswordResetHandler } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reestablecer contraseña",
  description: "Página para reestablecer la contraseña en CashTracker",
};

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Reestablecer Password</h1>
      <p className="text-3xl font-bold">Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>
      <PasswordResetHandler />
    </>
  );
}
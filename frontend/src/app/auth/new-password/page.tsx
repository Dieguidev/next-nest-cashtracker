import { PasswordResetHandler } from "@/components";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Página de inicio de sesión para acceder a CashTracker",
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
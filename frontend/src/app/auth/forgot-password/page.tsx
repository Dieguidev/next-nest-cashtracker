

import { ForgotPasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  description: "Página para recuperar la contraseña de acceso a CashTracker",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Recuperar contraseña</h1>
      <p className="text-3xl font-bold">Ingresa tu email para recibir instrucciones</p>

      <ForgotPasswordForm />
    </>
  );
}



import { ForgotPasswordForm } from "@/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  description: "Página para recuperar la contraseña de acceso a CashTracker",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
      <p className="text-3xl font-bold">Aquí puedes <span className="text-amber-600">reestablecerla</span></p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href='/auth/login'
          className="text-center text-gray-500"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          href='/auth/register'
          className="text-center text-gray-500"
        >
          ¿No tienes cuenta? Crear una cuenta
        </Link>
      </nav>
    </>
  );
}

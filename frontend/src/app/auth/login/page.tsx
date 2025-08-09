import { LoginForm } from "@/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Página de inicio de sesión para acceder a CashTracker",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Iniciar sesión</h1>
      <p className="text-3xl font-bold">y controla tus <span className="text-amber-600">finanzas</span></p>

      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href='/auth/register'
          className="text-center text-gray-500"
        >
          ¿No tienes cuenta? Crear una cuenta
        </Link>

        <Link
          href='/auth/forgot-password'
          className="text-center text-gray-500"
        >
          ¿Olvidaste tu contraseña? Restablecer contraseña
        </Link>
      </nav>
    </>
  );
}
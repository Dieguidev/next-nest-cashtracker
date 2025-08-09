import { LoginForm } from "@/components";
import { Metadata } from "next";

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
    </>
  );
}
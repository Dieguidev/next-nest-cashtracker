import { RegisterForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear una cuenta",
  description: "Página de registro para crear una cuenta en CashTracker",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Crear una cuenta</h1>
      <p className="text-3xl font-bold">y controla tus <span className="text-amber-600">finanzas</span></p>

      <RegisterForm />
    </>
  );
}
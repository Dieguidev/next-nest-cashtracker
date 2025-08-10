import { ConfirmAccountForm } from "@/components";

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">Ingresa el código que recibiste <span className="text-amber-600">por email</span></p>

      <ConfirmAccountForm />
    </>
  );
}
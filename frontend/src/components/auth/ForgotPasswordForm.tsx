'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { forgotPasswordAction } from "@/actions";
import { toast } from "react-toastify";


type FormInputs = {
  email: string
}

export const ForgotPasswordForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    email: "",
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await forgotPasswordAction(data);
    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return
    }
    toast.success(res.message);
    reset();
    setIsLoading(false);
  }

  return (
    <form
      className=" mt-14 space-y-5"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 mb-10">
        <label
          className="font-bold text-2xl"
        >Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "El email no es válido",
            },
          })}
        />
        {errors.email && (
          <ErrorMessage message={errors.email.message} />
        )}
      </div>

      <input
        type="submit"
        value={isLoading ? "Cargando..." : "Enviar Instrucciones"}
        className={`bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}

      // " "
      />
    </form>
  )
}
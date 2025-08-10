'use client'

import { useForm } from "react-hook-form"
import { ErrorMessage } from "../ui/ErrorMessage"
import { useState } from "react"
import { createAccountAction } from "@/actions"
import { toast } from "react-toastify"

type FormInputs = {
  email: string
  name: string
  password: string
  password_confirmation: string
}

export const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  }

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues })

  const password = watch("password");

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await createAccountAction(data);
    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return
    }

    toast.success(res.message);
    reset();
    setIsLoading(false);

    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-14 space-y-5"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
          htmlFor="email"
        >Email</label>
        <input
          id="email"
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
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Nombre</label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("name", {
            required: "El nombre es requerido",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password_confirmation", {
            required: "La confirmación de contraseña es requerida",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.password_confirmation && (
          <ErrorMessage message={errors.password_confirmation.message} />
        )}
      </div>

      <input
        type="submit"
        value={isLoading ? "Cargando..." : "Registrarme"}
        className={`bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      />
    </form>
  )
}

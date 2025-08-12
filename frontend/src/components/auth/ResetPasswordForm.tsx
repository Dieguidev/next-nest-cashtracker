'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../ui/ErrorMessage"
import { resetPasswordAction } from "@/actions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface ResetPasswordFormProps {
  token: string;
}

type FormInputs = {
  password: string
  password_confirmation: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
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
    const res = await resetPasswordAction(data, token);
    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return
    }

    toast.success(res.message);
    setIsLoading(false);
    reset();
    router.push("/auth/login");
  }

  return (
    <form
      className=" mt-14 space-y-5"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
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

      <div className="flex flex-col gap-5">
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
        value={isLoading ? "Cargando..." : "Guardar Password"}
        className={`bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}


      />
    </form>
  )
}

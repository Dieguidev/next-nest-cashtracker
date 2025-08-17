"use client";

import { updatePasswordAction } from "@/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorMessage } from "../ui/ErrorMessage";

type FormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await updatePasswordAction(data);
    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return;
    }

    toast.success(res.message);
    reset();
    setIsLoading(false);
  };

  return (
    <>
      <form
        className=" mt-14 space-y-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="current_password">
            Password Actual
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Password Actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("currentPassword", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.currentPassword && (
            <ErrorMessage message={errors.currentPassword.message} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="password">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("newPassword", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.newPassword && (
            <ErrorMessage message={errors.newPassword.message} />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="font-bold text-2xl">
            Repetir Password
          </label>

          <input
            id="confirmNewPassword"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            {...register("confirmNewPassword", {
              required: "La confirmación de contraseña es requerida",
              validate: (value) =>
                value === newPassword || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmNewPassword && (
            <ErrorMessage message={errors.confirmNewPassword.message} />
          )}
        </div>

        <input
          type="submit"
          value={isLoading ? "Cargando..." : "Cambiar Password"}
          className={`bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>
    </>
  );
};

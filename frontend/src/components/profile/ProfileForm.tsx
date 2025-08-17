"use client";

import { User } from "@/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { updateUserAction } from "@/actions";
import { toast } from "react-toastify";

interface ProfileFormProps {
  user: User;
}

type FormInputs = {
  email: string;
  name: string;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    email: user.email,
    name: user.name,
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await updateUserAction(data);
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
          <label className="font-bold text-2xl">Nombre</label>
          <input
            type="name"
            placeholder="Tu Nombre"
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
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Tu Email"
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

        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
};

'use client'

import { createBudgetAction } from "@/actions"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

type FormInputs = {
  name: string
  amount: string
}

export const CreateBudgetForm = () => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    name: "",
    amount: '',
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await createBudgetAction({
      name: data.name,
      amount: parseFloat(data.amount)
    });
    if (!res.success) {
      toast.error(res.message, {
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    toast.success(res.message, {
      autoClose: 3000,
    })
    reset();
    setIsLoading(false);
    router.push("/admin");

  }

  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del Presupuesto"
          {
          ...register("name", { required: 'El nombre es requerido' })
          }
        />
        {errors.name && (
          <ErrorMessage message={errors.name.message} />
        )}
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Cantidad Presupuesto"
          {
          ...register("amount", { required: 'La cantidad es requerida' })
          }
        />
        {errors.amount && (
          <ErrorMessage message={errors.amount.message} />
        )}
      </div>
      <input
        type="submit"
        value={isLoading ? "Cargando..." : "Crear Presupuesto"}
        className={`bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      />
    </form>
  )
}

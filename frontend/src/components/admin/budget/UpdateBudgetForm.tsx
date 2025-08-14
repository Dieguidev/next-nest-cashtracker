'use client'

import { Budget } from "@/interface"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BudgetForm } from "./BudgetForm"
import { toast } from "react-toastify"
import { updateBudgetAction } from "@/actions"

interface UpdateBudgetForm {
  budget: Budget
}

type FormInputs = {
  name: string
  amount: string
}

export const UpdateBudgetForm = ({ budget }: UpdateBudgetForm) => {

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    name: budget.name,
    amount: budget.amount.toString(),
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await updateBudgetAction({
      id: budget.id,
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
    setIsLoading(false);

  }



  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <BudgetForm
        register={register}
        errors={errors}
      />
      <input
        type="submit"
        value={isLoading ? "Cargando..." : "Actualizar Presupuesto"}
        className={`bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      />
    </form>
  )
}

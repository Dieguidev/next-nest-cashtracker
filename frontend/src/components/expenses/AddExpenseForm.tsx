"use client";
import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createExpenseAction } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type FormInputs = {
  name: string;
  amount: string;
};

interface AddExpenseFormProps {
  budgetId: string;
}

export const AddExpenseForm = ({ budgetId }: AddExpenseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues: FormInputs = {
    name: "",
    amount: "",
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: initialValues });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await createExpenseAction({
      name: data.name,
      amount: parseFloat(data.amount),
      budgetId: budgetId!,
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
    });
    reset();
    setIsLoading(false);
    router.push(`/admin/budgets/${budgetId}`);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 "
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <ExpenseForm register={register} errors={errors} />
        <input
          type="submit"
          className={`bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value={isLoading ? "Cargando..." : "Crear Gasto"}
        />
      </form>
    </>
  );
};

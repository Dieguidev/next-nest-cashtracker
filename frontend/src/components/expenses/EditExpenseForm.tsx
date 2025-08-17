"use client";
import { getExpenseAction, updateExpenseAction } from "@/actions";
import { DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExpenseForm } from "./ExpenseForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  amount: string;
};

interface EditExpenseFormProps {
  budgetId: string;
  editExpenseId?: string;
}

export const EditExpenseForm = ({
  budgetId,
  editExpenseId,
}: EditExpenseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  // ESTO SÍ VA EN useEffect - solo para cargar y pre-llenar
  useEffect(() => {
    if (editExpenseId) {
      const loadExpense = async () => {
        const res = await getExpenseAction({
          expenseId: editExpenseId,
          budgetId,
        });
        if (res.success && res.expense) {
          reset({
            name: (res.expense as any).name,
            amount: (res.expense as any).amount.toString(),
          });
        }
      };
      loadExpense();
    }
  }, [editExpenseId, budgetId, reset]);

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await updateExpenseAction({
      budgetId,
      expenseId: editExpenseId!,
      name: data.name,
      amount: parseFloat(data.amount),
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
    setIsLoading(false);
    router.push(`/admin/budgets/${budgetId}`);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <ExpenseForm register={register} errors={errors} />
        <input
          type="submit"
          value={isLoading ? "Cargando..." : "Actualizar Presupuesto"}
          className={`bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        />
      </form>
    </>
  );
};

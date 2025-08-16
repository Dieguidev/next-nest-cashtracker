import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";

type FormInputs = {
  name: string;
  amount: string;
};

interface ExpenseFormProps {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

export const ExpenseForm = ({ register, errors }: ExpenseFormProps) => {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Gasto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100  bg-white"
          type="text"
          placeholder="Nombre del Gasto"
          {...register("name", { required: "El nombre es requerido" })}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Gasto
        </label>
        <input
          id="amount"
          className="w-full p-3  border border-gray-100 bg-white"
          type="number"
          placeholder="Cantidad Gasto"
          {...register("amount", { required: "La cantidad es requerida" })}
        />
        {errors.amount && <ErrorMessage message={errors.amount.message} />}
      </div>
    </>
  );
};

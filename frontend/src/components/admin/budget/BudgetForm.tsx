import { ErrorMessage } from '@/components/ui/ErrorMessage'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type FormInputs = {
  name: string
  amount: string
}

interface BudgetFormProps {
  register: UseFormRegister<FormInputs>
  errors: FieldErrors<FormInputs>
}

export const BudgetForm = ({ register, errors }: BudgetFormProps) => {
  return (
    <>
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
    </>
  )
}

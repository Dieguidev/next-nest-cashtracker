import { getBudgetByIdAction } from "@/actions";
import { AddExpenseButton, ModalContainer } from "@/components";
import { notFound } from "next/navigation";

interface BudgetDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BudgetDetailsPageProps) {
  const { id } = await params;

  const { budget } = await getBudgetByIdAction(id);
  if (!budget) {
    return {
      title: "Presupuesto no encontrado",
    };
  }

  return {
    title: `${budget.name}`,
    description: `Edita el presupuesto ${budget.name} con los detalles actuales.`,
  };
}

export default async function BudgetDetailsPage({
  params,
}: BudgetDetailsPageProps) {
  const { id } = await params;

  const { budget } = await getBudgetByIdAction(id);
  if (!budget) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      <ModalContainer />
    </>
  );
}

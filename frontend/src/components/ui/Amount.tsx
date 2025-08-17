import { formatCurrency } from "@/utils";

interface AmountProps {
  label: string;
  amount: number;
}

export const Amount = ({ label, amount }: AmountProps) => {
  return (
    <p className="text-2xl font-bold">
      {label}: <span className="text-amber-500">{formatCurrency(amount)}</span>
    </p>
  );
};

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "budgetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "public"."Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

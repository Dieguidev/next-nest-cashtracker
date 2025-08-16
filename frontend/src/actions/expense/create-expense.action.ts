"use server";

import { getToken } from "@/authentication/get-token";
import { revalidatePath } from "next/cache";

interface CreateExpenseActionData {
  name: string;
  amount: number;
  budgetId: string;
}

export async function createExpenseAction(formData: CreateExpenseActionData) {
  const token = await getToken();

  const { budgetId, ...rest } = formData;

  console.log(budgetId);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${budgetId}/expenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rest),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Manejo específico para Too Many Requests (429)
      if (response.status === 429) {
        return {
          success: false,
          message:
            "Has excedido el límite de intentos. Por favor, espera unos minutos antes de intentar nuevamente.",
          budget: {},
          errorType: "rate_limit",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message: "No tienes permiso para realizar esta acción.",
          budget: {},
          errorType: "unauthorized",
        };
      }

      return {
        success: false,
        message:
          "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        budget: {},
        errorType: "validation",
      };
    }

    revalidatePath("/admin/budgets");

    return {
      success: true,
      message: "El gasto se ha creado correctamente.",
      budget: data.data,
      errorType: null,
    };
  } catch (error) {
    console.error("Create budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      budget: {},
      errorType: "network",
    };
  }
}

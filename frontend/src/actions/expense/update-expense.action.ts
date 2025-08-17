"use server";

import { getToken } from "@/authentication/get-token";
import { revalidateTag } from "next/cache";

interface UpdateExpenseActionData {
  budgetId: string;
  expenseId: string;
  amount: number;
  name: string;
}

export async function updateExpenseAction(data: UpdateExpenseActionData) {
  const { budgetId, expenseId, ...rest } = data;

  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${budgetId}/expenses/${expenseId}`,
      {
        method: "PATCH",
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
          expense: {},
          errorType: "rate_limit",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message: "No tienes permiso para realizar esta acción.",
          expense: {},
          errorType: "unauthorized",
        };
      }

      if (response.status >= 500) {
        return {
          success: false,
          message:
            "No pudimos actualizar el presupuesto en este momento. Por favor, intenta más tarde.",
          expense: {},
          errorType: "server_error",
        };
      }

      return {
        success: false,
        message:
          "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        expense: {},
        errorType: "validation",
      };
    }

    revalidateTag(`budget-${budgetId}`);
    revalidateTag(`expense-${expenseId}`);

    return {
      success: true,
      message: "El gasto se actualizó correctamente.",
      budget: data,
      errorType: null,
    };
  } catch (error) {
    console.error("Update expense failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      expense: {},
      errorType: "network",
    };
  }
}

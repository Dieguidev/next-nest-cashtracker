"use server";

import { getToken } from "@/authentication/get-token";
import { Expense } from "@/interface";

interface GetExpenseActionData {
  expenseId: string;
  budgetId: string;
}

export async function getExpenseAction(formData: GetExpenseActionData) {
  const { expenseId, budgetId } = formData;

  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${budgetId}/expenses/${expenseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: false,
          tags: [`budget-${budgetId}`],
        },
      }
    );

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

      return {
        success: false,
        message:
          "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        expense: {},
        errorType: "validation",
      };
    }
    const data = await response.json();
    return {
      success: true,
      message: "El gasto se ha obtenido correctamente.",
      expense: data as Expense,
      errorType: null,
    };
  } catch (error) {
    console.error("Create budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      expense: {},
      errorType: "network",
    };
  }
}

"use server";
import { getToken } from "@/authentication/get-token";

import { revalidatePath } from "next/cache";

interface UpdateBudgetActionData {
  id: string;
  name: string;
  amount: number;
}

export async function updateBudgetAction(formData: UpdateBudgetActionData) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${formData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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

      if (response.status >= 500) {
        return {
          success: false,
          message:
            "No pudimos actualizar el presupuesto en este momento. Por favor, intenta más tarde.",
          budget: {},
          errorType: "server_error",
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

    revalidatePath("/admin");
    revalidatePath("/admin/budgets");

    return {
      success: true,
      message: "El presupuesto se actualizó correctamente.",
      budget: data.data,
      errorType: null,
    };
  } catch (error) {
    console.error("Update budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      budget: {},
      errorType: "network",
    };
  }
}

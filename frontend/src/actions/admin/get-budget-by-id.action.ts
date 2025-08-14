'use server'

import { getToken } from "@/authentication/get-token";
import { Budget } from "@/interface";

export async function getBudgetByIdAction(id: string){
  const token = await getToken();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const data = await response.json();

    if (!response.ok) {
      // Manejo específico para Too Many Requests (429)
      if (response.status === 429) {
        return {
          success: false,
          message:
            "Has excedido el límite de intentos. Por favor, espera unos minutos antes de intentar nuevamente.",
          budget: null,
          errorType: "rate_limit",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message:
            "No tienes permiso para realizar esta acción.",
          budgets: null,
          errorType: "unauthorized",
        };
      }

      return {
        success: false,
        message: "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        budget: null,
        errorType: "validation",
      };
    }

    return {
      success: data.success,
      message: "Presupuesto obtenido correctamente.",
      budget: data.data as Budget,
      errorType: null,
    };

  } catch (error) {
    console.error("Get budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      budget: null,
      errorType: "network",
    };
  }
}
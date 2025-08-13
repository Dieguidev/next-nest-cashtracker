'use server'

import { Budget } from "@/interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllBudgetsAction(){
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;
  if (!token) {
    redirect("/auth/login");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });

    if (!response.ok) {
    throw new Error("Failed to fetch budgets");
    }

    const data = await response.json();

    if (!response.ok) {
      // Manejo específico para Too Many Requests (429)
      if (response.status === 429) {
        return {
          success: false,
          message:
            "Has excedido el límite de intentos. Por favor, espera unos minutos antes de intentar nuevamente.",
          budgets: [],
          errorType: "rate_limit",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message:
            "No tienes permiso para realizar esta acción.",
          budgets: [],
          errorType: "unauthorized",
        };
      }

      return {
        success: false,
        message: "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        budgets: [],
        errorType: "validation",
      };
    }

    return {
      success: true,
      message:
        "Presupuesto obtenido correctamente.",
      budgets: data.data as Budget[],
      errorType: null,
    };

  } catch (error) {
    console.error("Create budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      budgets: [],
      errorType: "network",
    };
  }
  
}     
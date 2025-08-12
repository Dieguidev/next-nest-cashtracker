'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateBudgetActionData {
  name: string;
  amount: number;
}



export async function createBudgetAction(formData: CreateBudgetActionData) {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;
  if (!token) {
    redirect("/auth/login");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget`,
      {
        method: "POST",
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
          message:
            "No tienes permiso para realizar esta acción.",
          budget: {},
          errorType: "unauthorized",
        };
      }

      return {
        success: false,
        message: "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        budget: {},
        errorType: "validation",
      };
    }

    revalidatePath("/admin");

    return {
      success: true,
      message:
        "El presupuesto se ha creado correctamente.",
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

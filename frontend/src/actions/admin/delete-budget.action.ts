"use server";

import { getToken } from "@/authentication/get-token";
import { revalidatePath } from "next/cache";

interface DeleteBudgetActionData {
  id: string;
  password: string;
}

export async function deleteBudgetAction(formData: DeleteBudgetActionData) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: formData.password,
        }),
      }
    );

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
          message: "El password no es el correcto",
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

    const data = await response.json();

    // If password is valid, proceed with budget deletion
    const deleteResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/budget/${formData.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const deleteData = await deleteResponse.json();

    if (!deleteResponse.ok) {
      return {
        success: false,
        message: deleteData.message || "Error al eliminar el presupuesto",
        budget: {},
        errorType: "delete_error",
      };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/budgets");

    return {
      success: true,
      message: "Presupuesto eliminado correctamente",
      budget: deleteData.data,
      errorType: null,
    };
  } catch (error) {
    console.error("Delete budget failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      budget: {},
      errorType: "network",
    };
  }
}

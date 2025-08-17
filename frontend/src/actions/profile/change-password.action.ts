"use server";
import { getToken } from "@/authentication/get-token";
import { revalidatePath } from "next/cache";

interface UpdatePasswordActionData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export async function updatePasswordAction(formData: UpdatePasswordActionData) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      // Manejo específico para Too Many Requests (429)
      if (response.status === 429) {
        return {
          success: false,
          message:
            "Has excedido el límite de intentos. Por favor, espera unos minutos antes de intentar nuevamente.",
          user: {},
          errorType: "rate_limit",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message: "No tienes permiso para realizar esta acción.",
          user: {},
          errorType: "unauthorized",
        };
      }

      if (response.status >= 500) {
        return {
          success: false,
          message:
            "No pudimos actualizar el presupuesto en este momento. Por favor, intenta más tarde.",
          user: {},
          errorType: "server_error",
        };
      }

      return {
        success: false,
        message:
          "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        user: {},
        errorType: "validation",
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: "La contraseña se actualizó correctamente.",
      user: data,
      errorType: null,
    };
  } catch (error) {
    console.error("Update user failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
      errorType: "network",
    };
  }
}

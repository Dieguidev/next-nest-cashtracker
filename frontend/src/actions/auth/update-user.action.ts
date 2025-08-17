"use server";
import { getToken } from "@/authentication/get-token";
import { revalidatePath } from "next/cache";

interface UpdateUserData {
  email: string;
  name: string;
}

export async function updateUserAction(formData: UpdateUserData) {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-user`,
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
          user: {},
          errorType: "rate_limit",
        };
      }
      if (response.status === 401) {
        return {
          success: false,
          message: "No autorizado. Por favor, inicia sesión nuevamente.",
          user: {},
          errorType: "unauthorized",
        };
      }

      const errorMessages: Record<string, string> = {
        "Email already exists": "El correo electrónico ya está registrado.",
        // "Slug already exists": "El handle de usuario ya está en uso.",
      };

      const errorMessage = Object.keys(errorMessages).find((key) =>
        data.message.includes(key)
      );

      return {
        success: false,
        message: errorMessage
          ? errorMessages[errorMessage]
          : "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        user: {},
        errorType: "validation",
      };
    }

    revalidatePath(`/profile/${data.id}`);
    return {
      success: true,
      message: "Datos actualizados exitosamente.",
      user: data,
      errorType: null,
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
      errorType: "network",
    };
  }
}

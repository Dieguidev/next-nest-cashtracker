"use server";

interface ForgotPasswordActionData {
  email: string;
}

export async function forgotPasswordAction(formData: ForgotPasswordActionData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      if (response.status === 404) {
        return {
          success: false,
          message:
            "No se encontró el usuario asociado a este correo electrónico.",
          user: {},
          errorType: "not_found",
        };
      }

      return {
        success: false,
        message: data.message
          ? data.message
          : "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        user: {},
        errorType: "validation",
      };
    }

    return {
      success: true,
      message:
        "Se ha enviado un correo electrónico de restablecimiento de contraseña.",
      user: data.user,
      errorType: null,
    };
  } catch (error) {
    console.error("Forgot password failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
      errorType: "network",
    };
  }
}

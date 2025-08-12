"use server";

interface ValidateTokenData {
  token: string;
}

export async function validateTokenAction(formData: ValidateTokenData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate-token`,
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
          message: "Token no válido",
          user: {},
          errorType: "validation",
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
      message: "Token válido. asigna un nuevo password.",
      user: {},
      errorType: null,
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
      errorType: "network",
    };
  }
}

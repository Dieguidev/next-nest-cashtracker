"use server";

interface CreateAccountData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export async function createAccountAction(formData: CreateAccountData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
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

    return {
      success: true,
      message: "Cuenta creada exitosamente.",
      user: data.user,
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

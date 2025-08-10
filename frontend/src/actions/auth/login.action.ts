"use server";

import { cookies } from "next/headers";

interface LoginActionData {
  email: string;
  password: string;
}

export async function loginAction(formData: LoginActionData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
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

      if (response.status === 401) {
        return {
          success: false,
          message: "Credenciales inválidas.",
          user: {},
          errorType: "credentials",
        };
      }

      if (response.status === 409) {
        return {
          success: false,
          message: "Email no confirmado.",
          user: {},
          errorType: "email_not_confirmed",
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

    const cookieStore = await cookies();

    cookieStore.set({
      name: "CASHTRACKER_TOKEN",
      value: data.token,
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Inicio de sesión exitoso.",
      user: data.user,
      errorType: null,
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
      errorType: "network",
    };
  }
}

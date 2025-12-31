'use server'

import { apiClient } from "@/api";
import { LoginSchema } from "@/schemas/auth.schema";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function loginUser(data: LoginSchema) {
  try {
    const response = await apiClient.post('/auth/login', data)
    const { access_token } = response.data

    if (access_token) {
      const cookieStore = await cookies()
      cookieStore.set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      })
    }
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || 'Error al iniciar sesión' }
    }

    return { error: 'Error de conexión con el servidor' }
  }

  redirect('/dashboard')
}

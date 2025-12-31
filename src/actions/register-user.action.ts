'use server'

import { apiClient } from "@/api";
import { RegisterSchema } from "@/schemas/auth.schema";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { cookies } from "next/headers";


export async function registerUser(data: RegisterSchema) {
  try {
    const response = await apiClient.post('/auth/register', data)
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
    console.error('Registration error:', error)

    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || 'Error al registrar usuario' }
    }

    return { error: 'Error de conexión con el servidor' }
  }

  redirect('/dashboard')
}
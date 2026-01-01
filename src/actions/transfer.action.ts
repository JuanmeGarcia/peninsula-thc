'use server'

import { apiClient } from "@/api"
import { cookies } from "next/headers"
import { AxiosError } from "axios"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type TransferData = {
  amount: number
  type: 'deposit' | 'withdrawal'
}

type TransferResponse = {
  success?: boolean
  newBalance?: number
  error?: string
}

export async function createTransfer(data: TransferData): Promise<TransferResponse> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
      redirect('/')
    }

    const response = await apiClient.post('/transfers/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Revalidar el dashboard para que se actualice el balance
    revalidatePath('/dashboard')

    return {
      success: true,
      newBalance: response.data.account?.balance ?? response.data.balance
    }
  } catch (error) {
    console.error('Transfer error:', error)

    if (error instanceof AxiosError) {
      // Si es 401 Unauthorized, limpiar sesión y redirigir
      if (error.response?.status === 401) {
        const cookieStore = await cookies()
        cookieStore.delete('access_token')
        redirect('/')
      }

      return { error: error.response?.data?.message || 'Error al procesar la transferencia' }
    }

    return { error: 'Error de conexión con el servidor' }
  }
}

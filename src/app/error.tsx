'use client'

import { useEffect } from 'react'
import { Button } from '@/componentes/UI/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-red-500">!</h1>
        <h2 className="text-2xl font-semibold text-white">Algo salió mal</h2>
        <p className="text-zinc-400 max-w-md">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <Button onClick={reset} className="px-6 py-3">
          Reintentar
        </Button>
      </div>
    </div>
  )
}

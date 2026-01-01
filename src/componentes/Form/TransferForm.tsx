'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { Input } from '@/componentes/Form/Input'
import { Button } from '@/componentes/UI/Button'
import { createTransfer } from '@/actions/transfer.action'

const transferSchema = z.object({
  type: z.enum(['deposit', 'withdrawal']),
  amount: z
    .string()
    .min(1, 'Ingresa un monto')
    .refine((val) => /^\d+\.?\d*$/.test(val), 'Formato inválido')
    .refine((val) => parseFloat(val) > 0, 'El monto debe ser mayor a 0')
})

type TransferFormData = z.infer<typeof transferSchema>

type TransferFormProps = {
  onBalanceUpdate?: (newBalance: number) => void
}

const Types = {
  deposit: 'deposit',
  withdrawal: 'withdrawal'
}

export function TransferForm({ onBalanceUpdate }: TransferFormProps) {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { register, watch, setValue, handleSubmit, formState: { errors }, reset } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      type: 'deposit',
      amount: ''
    },
    mode: 'onChange'
  })

  const selectedType = watch('type')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Solo permite: dígitos y un solo punto decimal
    // Debe empezar con número, no con punto
    if (value === '' || /^\d+\.?\d*$/.test(value)) {
      setValue('amount', value, { shouldValidate: true })
    }
  }

  const onSubmit = (data: TransferFormData) => {
    setServerError(null)
    setSuccessMessage(null)

    startTransition(async () => {
      const result = await createTransfer({
        amount: parseFloat(data.amount),
        type: data.type
      })

      if (result.error) {
        setServerError(result.error)
        return
      }

      if (!result.success) {
        return
      }

      setSuccessMessage(
        data.type === 'deposit'
          ? `Depósito de $${data.amount} realizado con éxito`
          : `Retiro de $${data.amount} realizado con éxito`
      )
      reset()

      if (result.newBalance !== undefined && onBalanceUpdate) {
        onBalanceUpdate(result.newBalance)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border border-zinc-800 rounded-lg">
      <div className="flex gap-2 shadow-2xl">
        <label
          onClick={() => setValue('type', 'deposit')}
          className={`flex gap-8 flex-1 flex-col p-4 shadow rounded-3xl cursor-pointer transition-all ${selectedType === 'deposit'
            ? 'bg-green-900/50 border-2 border-green-500'
            : 'bg-neutral-800 border-2 border-transparent hover:bg-neutral-700'
            }`}
        >
          <div className="justify-between flex items-center gap-2">
            <ArrowBigUp size={64} color={selectedType === 'deposit' ? '#22c55e' : 'white'} />
            <input
              type="radio"
              value="deposit"
              {...register('type')}
              className="size-8 accent-green-500"
            />
          </div>
          <h3 className="text-2xl">Depositar</h3>
        </label>

        <label
          onClick={() => setValue('type', 'withdrawal')}
          className={`flex gap-8 flex-1 flex-col p-4 shadow rounded-3xl cursor-pointer transition-all ${selectedType === 'withdrawal'
            ? 'bg-red-900/50 border-2 border-red-500'
            : 'bg-neutral-800 border-2 border-transparent hover:bg-neutral-700'
            }`}
        >
          <div className="justify-between flex items-center gap-2">
            <ArrowBigDown size={64} color={selectedType === 'withdrawal' ? '#ef4444' : 'white'} />
            <input
              type="radio"
              value="withdrawal"
              {...register('type')}
              className="size-8 accent-red-500"
            />
          </div>
          <h3 className="text-2xl">Retirar</h3>
        </label>
      </div>

      <div className="bg-neutral-800 shadow flex flex-col gap-2 p-4 rounded-3xl mt-2">
        <div className="flex justify-between items-center gap-2">
          <Input
            value={watch('amount') ?? ''}
            onChange={handleAmountChange}
            className={`w-full px-4 py-5 text-4xl bg-transparent text-center ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
            type="text"
            placeholder="0.00"
            disabled={isPending}
          />
          <Button type="submit" className="text-2xl px-6 py-4" disabled={isPending}>
            {isPending ? 'Procesando...' : 'Confirmar'}
          </Button>
        </div>
        {errors.amount && (
          <p className="text-red-500 text-sm text-center">{errors.amount.message}</p>
        )}
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}
      </div>
    </form>
  )
}

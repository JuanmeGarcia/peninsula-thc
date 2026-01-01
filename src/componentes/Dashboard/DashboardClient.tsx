'use client'

import { useState } from 'react'
import { TransferForm } from '@/componentes/Form/TransferForm'

type DashboardClientProps = {
  initialBalance: number
  username: string
}

export function DashboardClient({ initialBalance, username }: DashboardClientProps) {
  const [balance, setBalance] = useState(initialBalance)

  return (
    <div className="bg-neutral-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl mb-4">Bienvenido {username}</h2>

      <section className="grid grid-cols-2 shadow-2xl">
        <div className="p-4 border grid place-content-center gap-2 border-zinc-800 rounded-lg mr-4 bg-linear-to-br from-slate-900 via-zinc-900 to-slate-900">
          <h3 className="text-center text-2xl">Balance:</h3>
          <h2 className="text-center text-8xl">${balance}</h2>
        </div>

        <TransferForm onBalanceUpdate={setBalance} />
      </section>
    </div>
  )
}

import { verifySession } from "@/libs/dal"
import { redirect } from "next/navigation"
import { logout } from "@/actions/logout.action"
import { DashboardClient } from "@/componentes/Dashboard/DashboardClient"

export default async function Dashboard() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        <DashboardClient
          initialBalance={session.user?.account.balance ?? 0}
          username={session.user?.username ?? ''}
        />
      </div>
    </div>
  );
}
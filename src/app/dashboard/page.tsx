import { verifySession } from "@/libs/dal"
import { redirect } from "next/navigation"
import { logout } from "@/actions/logout.action"

export default async function Dashboard() {
  const session = await verifySession()

  console.log({ session });


  console.log({ session });

  if (!session.isAuth) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        <div className="bg-neutral-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-2xl mb-4">Bienvenido</h2>
          <p className="text-zinc-400">Has iniciado sesión correctamente.</p>
        </div>
      </div>
    </div>
  );
}
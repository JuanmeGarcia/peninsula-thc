import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-zinc-800">404</h1>
        <h2 className="text-2xl font-semibold text-white">Página no encontrada</h2>
        <p className="text-zinc-400 max-w-md">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

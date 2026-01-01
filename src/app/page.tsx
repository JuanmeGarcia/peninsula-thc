import { BackgroundBeams } from "@/componentes/UI/Background";
import { AuthWrapper } from "@/componentes/Auth/AuthWrapper";
import { verifySession } from "@/libs/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await verifySession()

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session.isAuth) {
    redirect('/dashboard')
  }

  return (
    <div className="relative flex w-full flex-col overflow-hidden min-h-dvh items-center  bg-zinc-100 font-sans dark:bg-neutral-950">
      <BackgroundBeams />
      <AuthWrapper />
    </div>
  );
}

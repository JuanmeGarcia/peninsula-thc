import { BackgroundBeams } from "@/componentes/UI/Background";
import { AuthWrapper } from "@/componentes/Auth/AuthWrapper";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden min-h-dvh items-center  bg-zinc-100 font-sans dark:bg-neutral-950">
      <BackgroundBeams />
      <AuthWrapper />
    </div>
  );
}

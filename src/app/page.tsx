import { BackgroundBeams } from "@/componentes/UI/Background";
import { Button } from "@/componentes/UI/Button";
import { Input } from "@/componentes/Form/Input";
import { FormContainer } from "@/componentes/Form/FormContainer";
import { RegisterForm } from "@/componentes/Form/RegisterForm";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden min-h-dvh items-center  bg-zinc-100 font-sans dark:bg-neutral-950">
      <BackgroundBeams />

      <section className="mt-30 z-20 p-4 w-full max-w-120 flex flex-col gap-3 rounded-2xl bg-neutral-900 border border-zinc-800">
        <h1 className="text-2xl sm:text-4xl">
          Registrar usuario
        </h1>

        <RegisterForm />




        <button className="text-xs w-fit p-2 hover:bg-neutral-600/70 transition-all rounded-xl cursor-pointer">Deseas iniciar sesion?</button>
      </section>
    </div>
  );
}

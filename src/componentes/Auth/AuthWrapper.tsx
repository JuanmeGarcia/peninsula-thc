'use client'

import { useState } from "react";
import { RegisterForm } from "@/componentes/Form/RegisterForm";
import { LoginForm } from "@/componentes/Form/LoginForm";

export const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="mt-30 z-20 p-4 w-full max-w-120 flex flex-col gap-3 rounded-2xl bg-neutral-900 border border-zinc-800">
      <h1 className="text-2xl sm:text-4xl">
        {isLogin ? "Iniciar sesión" : "Registrar usuario"}
      </h1>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <button
        onClick={() => setIsLogin(prevLogin => !prevLogin)}
        className="text-xs w-fit p-2 hover:bg-neutral-600/70 transition-all rounded-xl cursor-pointer"
      >
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Deseas iniciar sesión?"}
      </button>
    </section>
  )
}

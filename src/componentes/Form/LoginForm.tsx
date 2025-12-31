'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../UI/Button"
import { Input } from "./Input"
import { loginUser } from "@/actions/login-user.action"
import { loginSchema, LoginSchema } from "@/schemas/auth.schema"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    const result = await loginUser(data)

    if (result?.error) {
      setError("root", {
        message: result.error,
      })
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="name@example.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-400">Contraseña</label>
        <Input
          type="password"
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-xs text-red-500">{errors.password.message}</span>
        )}
      </div>

      {errors.root && (
        <div className="text-sm text-red-500 text-center">
          {errors.root.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  )
}

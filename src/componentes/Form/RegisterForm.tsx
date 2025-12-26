import { Button } from "../UI/Button"
import { FormContainer } from "./FormContainer"
import { Input } from "./Input"

export const RegisterForm = () => {
  return (
    <FormContainer>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
        <Input type="email" id="email" name="email" placeholder="name@example.com" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-400">Contraseña</label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button
        type="submit"
      >
        Registrarse
      </Button>
    </FormContainer>
  )
}

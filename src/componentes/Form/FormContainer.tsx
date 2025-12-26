import { ReactNode } from "react"


type Props = {
  children: ReactNode
} & React.FormHTMLAttributes<HTMLFormElement>

export const FormContainer = ({
  children,
  ...props
}: Props) => {
  return (
    <form {...props} className="flex flex-col gap-2">
      {children}
    </form>
  )
}

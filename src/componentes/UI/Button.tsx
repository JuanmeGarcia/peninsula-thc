import { ReactNode } from "react"

type Props = {
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  ...props
}: Props) => {
  return (
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103BC,45%,#1e2631BC,55%,#000103BC)] bg-size-[200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 cursor-pointer focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white hover:border-slate-600 shadow-lg"
      {...props}
    >
      {children}
    </button>
  )
}

import { ReactNode } from "react"

interface ContainerProps {
  children?: ReactNode,
  className?: string
}

export const Container = ({children, className}: ContainerProps) => {
  return (
    <div className="md:container md:mx-auto">
      {children}
    </div>
  )
}
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export interface ImageContainerProps {
  src: string
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | string
  title?: string
  kind?: "primary" | "secondary"
}

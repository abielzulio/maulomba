import { ButtonProps } from "types/component"

const Button = (props: ButtonProps) => {
  const {
    icon = "+",
    title = "Button",
    kind = "primary",
    className = ``,
    size = "small",
    ...rest
  } = props
  return (
    <button
      className={`${className} flex h-fit w-full items-center rounded-lg border-[1.5px] text-sm transition sm:w-fit  ${
        size === "small"
          ? `gap-[5px] py-[5px] px-[10px] font-medium`
          : `gap-[10px] py-[10px] px-[20px] font-semibold`
      } ${
        kind === "primary"
          ? `border-white border-opacity-20 bg-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/40`
          : `border-blue-500 border-opacity-20 bg-blue-500 bg-opacity-10 text-blue-500 hover:border-opacity-50`
      }`}
      {...rest}
    >
      {icon}
      <span className="text-left">{title}</span>
    </button>
  )
}

export default Button

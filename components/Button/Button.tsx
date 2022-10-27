import { ButtonProps } from "types/component"

const Button = (props: ButtonProps) => {
  const {
    icon = "+",
    title,
    kind,
    className = ``,
    size = "small",
    ...rest
  } = props
  return (
    <button
      className={`${className} flex h-fit w-fit items-center rounded-lg border-[1.5px] border-opacity-20 text-sm transition hover:border-opacity-50 sm:w-fit ${
        size === "small"
          ? `gap-[5px] py-[5px] px-[10px] font-medium`
          : `gap-[10px] py-[10px] px-[20px] font-semibold`
      } ${
        kind === "primary" &&
        `border-white bg-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/40`
      }
        ${
          kind === "secondary" &&
          `border-blue-500  bg-blue-500 bg-opacity-20 text-blue-500`
        }
        ${
          kind === "neutral" &&
          `border-white border-opacity-20 bg-white bg-opacity-20 text-white`
        }
      }`}
      {...rest}
    >
      {icon}
      {title && <span className="text-left">{title}</span>}
    </button>
  )
}

export default Button

import { ButtonProps } from "types/component"

const Button = (props: ButtonProps) => {
  const {
    icon = "+",
    title,
    kind,
    className = ``,
    size = "small",
    width = "fit",
    label,
    ...rest
  } = props
  return (
    <button
      type="button"
      className={`${className} flex h-fit items-center justify-center rounded-lg border-[1.3px] border-opacity-20 transition hover:border-opacity-50 ${
        width === "fit" ? `w-fit` : `w-full`
      } ${
        size === "small"
          ? `gap-[8px] px-[10px] font-medium ${title ? `py-[5px]` : `py-[7px]`}`
          : `gap-[10px] px-[20px] font-semibold ${
              title ? `py-[10px]` : `py-[13px]`
            } `
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
      {title && (
        <span
          className={`text-center ${
            size === "small" ? `text-[14px]` : `text-sm`
          }`}
        >
          {title}
        </span>
      )}
      {label && (
        <span className="rounded-full border-[0.5px] border-blue-500/30 bg-black/20 px-[8px] font-mono text-[10px] tracking-tight text-opacity-50">
          {label}
        </span>
      )}
    </button>
  )
}

export default Button

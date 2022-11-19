import Link from "components/Link"
import { socials } from "data/socials"

const Footer = () => {
  return (
    <footer className="padding-x padding-y flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[20px]">
        <div className="flex gap-[20px]">
          {socials.map(({ href, icon }, id) => (
            <Link
              key={id}
              href={href}
              newTab
              className="opacity-50 transition hover:opacity-100"
            >
              {icon}
            </Link>
          ))}
        </div>
        <p className="text-center text-sm opacity-50">© Maulomba</p>
        <p className="-mt-[10px] text-center text-sm opacity-30">
          Indonesia, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default Footer

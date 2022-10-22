import React from "react"
import NextLink from "next/link"

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  newTab: boolean
}

const Link = ({ children, href, newTab, ...rest }: LinkProps) => (
  <NextLink href={href!} passHref>
    <a target={newTab ? "_blank" : undefined} {...rest}>
      {children}
    </a>
  </NextLink>
)

Link.defaultProps = { newTab: false }

export default Link

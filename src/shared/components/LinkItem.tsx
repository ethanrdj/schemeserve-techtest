import { FC } from "react"
import { Link } from "react-router-dom"

type LinkItemProps = {
  navigateTo: string
  label: string
}

export const LinkItem: FC<LinkItemProps> = ({ navigateTo, label }) => {
  return (
    <Link to={navigateTo} data-testid="link-item">
      <h2 className="text-white underline decoration-solid underline-offset-4  hover:text-blue-300">
        {label}
      </h2>
    </Link>
  )
}

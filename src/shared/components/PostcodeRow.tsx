import { FC } from "react"
import { Postcode } from "../types/postcode"
import { LinkItem } from "./LinkItem"

type PostcodeRowProps = {
  postcode: Postcode
}

export const PostcodeRow: FC<PostcodeRowProps> = ({ postcode }) => {
  return (
    <div className="flex items-center justify-between  pt-5 border-t">
      <h2 className="text-white font-semibold">{postcode.input}</h2>
      <div className="flex gap-6">
        <LinkItem navigateTo={`/${postcode.input}`} label="View all data" />
        <LinkItem navigateTo={`/${postcode.input}/map`} label="View on map" />
      </div>
    </div>
  )
}

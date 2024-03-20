import { FC } from "react"

type TableHeaderProps = { label: string }

export const TableHeader: FC<TableHeaderProps> = ({ label }) => {
  return <th className="text-start text-white font-bold py-2 px-4">{label}</th>
}

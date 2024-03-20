import { FC } from "react"

type TableItemProps = { label: string }

export const TableItem: FC<TableItemProps> = ({ label }) => {
  return <td className="text-start p-4">{label}</td>
}

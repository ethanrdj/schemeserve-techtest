import { FC } from "react"

export type SearchHistoryItemProps = {
  label: string
  onClick: () => void
  onRemove?: () => void
}

export const SearchHistoryItem: FC<SearchHistoryItemProps> = ({
  label,
  onClick,
  onRemove,
}) => {
  return (
    <div
      className="flex gap-3 p-2 border border-white rounded-md text-white hover:text-blue-300 cursor-pointer"
      onClick={onClick}
      data-testid="search-history-item"
    >
      <h2>{label}</h2>
      {onRemove && (
        <button
          className="hover:text-blue-400"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          data-testid="remove-button"
        >
          x
        </button>
      )}
    </div>
  )
}

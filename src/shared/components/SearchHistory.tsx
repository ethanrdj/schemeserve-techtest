import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  clearPostcodeHistory,
  removePostcodeFromHistory,
  selectSearchHistory,
} from "../services/slices/historySlice"
import { SearchHistoryItem } from "./SearchHistoryItem"

type SearchHistoryProps = {
  onSearchPostcode: (postcode: string) => void
}

export const SearchHistory: FC<SearchHistoryProps> = ({ onSearchPostcode }) => {
  const searchHistory = useSelector(selectSearchHistory)
  const dispatch = useDispatch()

  const onRemovePostcode = useCallback(
    (postcode: string) => {
      dispatch(removePostcodeFromHistory(postcode))
    },
    [dispatch]
  )

  const onClearHistory = useCallback(() => {
    dispatch(clearPostcodeHistory())
  }, [dispatch])

  return (
    <div className="flex flex-col items-start justify-start w-9/12">
      {searchHistory.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-white">Search history</h1>
          <div className="flex gap-4 flex-wrap">
            {searchHistory.map((postcode) => (
              <SearchHistoryItem
                key={postcode}
                label={postcode}
                onClick={() => onSearchPostcode(postcode)}
                onRemove={() => onRemovePostcode(postcode)}
              />
            ))}
            <SearchHistoryItem label="Clear history" onClick={onClearHistory} />
          </div>
        </div>
      )}
    </div>
  )
}

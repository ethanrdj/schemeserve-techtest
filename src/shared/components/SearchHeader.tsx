import { FC, FormEvent } from "react"
import { SearchBar } from "./SearchBar"
import { isValidUKPostcode } from "../utils/isValidUKPassword"

type SearchHeaderProps = {
  searchValue: string
  onChange: (postcode: string) => void
  onSearch: (postcode: string) => void
}

export const SearchHeader: FC<SearchHeaderProps> = ({
  searchValue,
  onChange,
  onSearch,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValidUKPostcode(searchValue)) {
      onSearch(searchValue)
      onChange("")
    } else {
      alert("Please enter a valid UK postcode.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-5">
      <SearchBar
        type="text"
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="h-14 p-3 bg-transparent border-2 border-white rounded-xl text-white hover:bg-white hover:text-blue-950"
        data-testid="search-button"
      >
        Search
      </button>
    </form>
  )
}

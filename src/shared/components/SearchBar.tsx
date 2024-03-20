import { forwardRef, InputHTMLAttributes } from "react"

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className="h-14 p-4 w-auto sm:w-96 bg-transparent border-2 border-white rounded-xl text-white focus:outline-2 focus:outline-white"
        placeholder="Search for a postcode e.g. SR1 3DD, TW5 9RL"
      />
    )
  }
)

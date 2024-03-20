import { fireEvent, render, screen } from "@testing-library/react"
import { SearchHeader } from "../SearchHeader"

import { SearchBarProps } from "../SearchBar"

const mockOnChange = jest.fn()
const mockOnSearch = jest.fn()

jest.mock("../SearchBar", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../SearchBar"),
    SearchBar: ({ onChange }: SearchBarProps) => (
      <input onChange={onChange} data-testid="mock-input" />
    ),
  }
})

describe("SearchHeader", () => {
  it("should render", () => {
    render(
      <SearchHeader
        searchValue=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    )
  })

  it("should call onChange when the user types in the input", async () => {
    render(
      <SearchHeader
        searchValue=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    )
    await fireEvent.change(screen.getByTestId("mock-input"), {
      target: { value: "M1" },
    })

    expect(mockOnChange).toHaveBeenCalledWith("M1")
  })

  it("should call onSearch when the search button is clicked", async () => {
    render(
      <SearchHeader
        searchValue="M1 7bh"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    )
    await fireEvent.click(screen.getByTestId("search-button"))

    expect(mockOnSearch).toHaveBeenCalledWith("M1 7bh")
  })
})

import { fireEvent, render, screen } from "@testing-library/react"
import { SearchHistoryItem } from "../SearchHistoryItem"

const mockOnClick = jest.fn()
const mockOnRemove = jest.fn()

describe("SearchHistoryItem", () => {
  it("should render", () => {
    render(<SearchHistoryItem label="Item label" onClick={mockOnClick} />)
  })

  it("should call onClick when an item is clicked", () => {
    render(<SearchHistoryItem label="Item label" onClick={mockOnClick} />)

    fireEvent.click(screen.getByTestId("search-history-item"))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("should call onRemove when the x is clicked", () => {
    render(
      <SearchHistoryItem
        label="Item label"
        onClick={mockOnClick}
        onRemove={mockOnRemove}
      />
    )

    fireEvent.click(screen.getByTestId("remove-button"))

    expect(mockOnRemove).toHaveBeenCalledTimes(1)
  })
})

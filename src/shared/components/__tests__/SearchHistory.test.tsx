import { fireEvent, render, screen } from "@testing-library/react"
import { SearchHistory } from "../SearchHistory"
import { Provider as ReduxProvider, useSelector } from "react-redux"
import { store } from "../../services/store"
import { SearchHistoryItemProps } from "../SearchHistoryItem"

const mockDispatch = jest.fn()
const mockOnSearchPostcode = jest.fn()

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
  }
})

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  }
})

jest.mock("../SearchHistoryItem", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../SearchHistoryItem"),
    SearchHistoryItem: ({ onClick, onRemove }: SearchHistoryItemProps) => (
      <>
        <button onClick={onClick} data-testid="onclick-button">
          onClick buton
        </button>
        <button onClick={onRemove} data-testid="onremove-button">
          onRemove button
        </button>
      </>
    ),
  }
})

describe("SearchHistory", () => {
  const setup = (searchHistory: string[]) => {
    //@ts-ignore
    ;(useSelector as jest.Mock).mockReturnValue(searchHistory)
    render(
      <ReduxProvider store={store}>
        <SearchHistory onSearchPostcode={mockOnSearchPostcode} />
      </ReduxProvider>
    )
  }
  it("should render", () => {
    setup([])
  })

  it("should search for a previous item", async () => {
    setup(["M1"])

    await fireEvent.click(screen.getAllByTestId("onclick-button")[0])

    expect(mockOnSearchPostcode).toHaveBeenCalledWith("M1")
  })
})

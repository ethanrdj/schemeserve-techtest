import { fireEvent, render, screen } from "@testing-library/react"
import { NoCrimesState } from "../NoCrimesState"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }
})

describe("NoCrimesState", () => {
  it("should render", () => {
    render(<NoCrimesState />)
  })

  it("should navigate back to the root route when the retry button is clicked", async () => {
    render(<NoCrimesState />)

    await fireEvent.click(screen.getByTestId("retry-button"))

    expect(mockNavigate).toHaveBeenCalledWith("/")
  })
})

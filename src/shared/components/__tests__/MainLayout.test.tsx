import { fireEvent, render, screen } from "@testing-library/react"
import { MainLayout } from "../MainLayout"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }
})

describe("MainLayout", () => {
  it("should render", () => {
    render(<MainLayout />)
  })

  it("should navigate back to the root route when the button is clicked", async () => {
    render(<MainLayout />)

    await fireEvent.click(screen.getByTestId("home-button"))

    expect(mockNavigate).toHaveBeenCalledWith("/")
  })
})

import { render, screen } from "@testing-library/react"
import { LoadingState } from "../LoadingState"

describe("LoadingState", () => {
  it("should render", () => {
    render(<LoadingState label="Loading crime data..." />)

    expect(screen.getByText("Loading crime data...")).toBeVisible()
  })
})

import { render, screen } from "@testing-library/react"
import { PostcodeRow } from "../PostcodeRow"
import { mockPostcode } from "../../mockData/postcodes"
import { BrowserRouter } from "react-router-dom"

describe("PostcodeRow", () => {
  it("should render", () => {
    render(
      <BrowserRouter>
        <PostcodeRow postcode={mockPostcode} />
      </BrowserRouter>
    )

    expect(screen.getByText(mockPostcode.input)).toBeVisible()
  })
})

import { fireEvent, render, screen } from "@testing-library/react"
import { LinkItem } from "../LinkItem"
import { BrowserRouter } from "react-router-dom"

const navigateTo = "/test-route"

describe("LinkItem", () => {
  it("should navigate to the specified route on click", async () => {
    render(
      <BrowserRouter>
        <LinkItem navigateTo={navigateTo} label="Test label" />
      </BrowserRouter>
    )

    await fireEvent.click(screen.getByTestId("link-item"))

    expect(window.location.pathname).toBe(navigateTo)
  })
})

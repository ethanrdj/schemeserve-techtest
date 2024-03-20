import { render } from "@testing-library/react"
import { Divider } from "../Divider"

describe("Divider", () => {
  it("should render", () => {
    render(<Divider />)
  })

  it("should render a vertical divider", () => {
    render(<Divider orientation="vertical" />)
  })
})

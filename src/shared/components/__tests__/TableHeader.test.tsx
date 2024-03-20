import { render } from "@testing-library/react"
import { TableHeader } from "../TableHeader"

describe("TableHeader", () => {
  it("should render", () => {
    render(<TableHeader label="Table header" />)
  })
})

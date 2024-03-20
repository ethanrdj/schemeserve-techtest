import { render } from "@testing-library/react"
import { TableItem } from "../TableItem"

describe("TableItem", () => {
  it("should render", () => {
    render(<TableItem label="Table header" />)
  })
})

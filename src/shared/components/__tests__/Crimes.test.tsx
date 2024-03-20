import { mockOutcomeCrime, mockOngoingCrime } from "../../mockData/crimes"
import { Crimes } from "../Crimes"
import { render, screen } from "@testing-library/react"

describe("Crimes", () => {
  it("should render", () => {
    render(
      <Crimes
        allCrimes={{
          theft: [mockOutcomeCrime],
        }}
      />
    )
  })

  it("should render a crime with an 'On Going' status", () => {
    render(
      <Crimes
        allCrimes={{
          theft: [mockOngoingCrime],
        }}
      />
    )

    expect(screen.getByText(/on going/i)).toBeVisible()
  })
})

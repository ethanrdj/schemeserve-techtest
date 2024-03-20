import { act, fireEvent, render, screen } from "@testing-library/react"
import { MainView } from "../MainView"
import { useGetCrimeData } from "../../shared/hooks/useGetCrimeData"
import { Postcode } from "../../shared/types/postcode"
import { mockPostcode } from "../../shared/mockData/postcodes"
import { Provider as ReduxProvider, useSelector } from "react-redux"
import { store } from "../../shared/services/store"
import { BrowserRouter } from "react-router-dom"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }
})

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  }
})

jest.mock("../../shared/hooks/useGetCrimeData", () => {
  return {
    __esModule: true,
    useGetCrimeData: jest.fn(),
  }
})

describe("MainView", () => {
  const setup = (foundPostcodes: Postcode[], loading: boolean) => {
    ;(useGetCrimeData as jest.Mock).mockReturnValue({
      getMultiplePostcodeData: jest.fn(),
      foundPostcodes,
    })
    //@ts-ignore
    ;(useSelector as jest.Mock).mockReturnValue(loading)

    return render(
      <BrowserRouter>
        <ReduxProvider store={store}>
          <MainView />
        </ReduxProvider>
      </BrowserRouter>
    )
  }
  it("should render", async () => {
    await act(async () => {
      setup([mockPostcode], false)
    })
  })

  it("should render the postcode data", async () => {
    await act(async () => {
      setup([mockPostcode], false)
    })

    expect(screen.getByText(mockPostcode.input)).toBeVisible()
    expect(screen.getByText("View all data")).toBeVisible()
  })

  it("should render the loading spinner when loading is true", async () => {
    await act(async () => {
      setup([], true)
    })

    expect(screen.getByText("Loading postcode data...")).toBeVisible()
  })

  it("should navigate to the details page when the 'View all data' link is clicked", async () => {
    await act(async () => {
      setup([mockPostcode], false)
    })

    fireEvent.click(screen.getByText("View all data"))

    expect(window.location.pathname).toBe(`/TW5%209RL`)
  })

  it("should navigate to the map page when the 'View on map' link is clicked", async () => {
    await act(async () => {
      setup([mockPostcode], false)
    })

    fireEvent.click(screen.getByText("View on map"))

    expect(window.location.pathname).toBe(`/TW5%209RL/map`)
  })
})

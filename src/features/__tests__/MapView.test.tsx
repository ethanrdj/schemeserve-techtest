import { act, render, screen } from "@testing-library/react"
import { MapView } from "../MapView"
import { Provider as ReduxProvider, useSelector } from "react-redux"
import { store } from "../../shared/services/store"
import { useGetCrimeData } from "../../shared/hooks/useGetCrimeData"
import { mockOngoingCrime } from "../../shared/mockData/crimes"
import { Crime } from "../../shared/types/crime"
import { BrowserRouter } from "react-router-dom"
import { mockPostcode } from "../../shared/mockData/postcodes"

jest.mock("../../shared/hooks/useGetCrimeData", () => {
  return {
    __esModule: true,
    useGetCrimeData: jest.fn(),
  }
})

const mockNavigate = jest.fn()
jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: mockPostcode.input }),
  }
})

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  }
})

jest.mock("../../contants", () => ({
  __esModule: true,
  GOOGLE_KEY: "1",
}))

describe("MapView", () => {
  const setup = (data: Crime[], loading: boolean) => {
    ;(useGetCrimeData as jest.Mock).mockReturnValue({
      getDetailedData: jest
        .fn()
        .mockReturnValue({ data, postcode: mockPostcode }),
    })
    //@ts-ignore
    ;(useSelector as jest.Mock).mockReturnValue(loading)

    return render(
      <BrowserRouter>
        <ReduxProvider store={store}>
          <MapView />
        </ReduxProvider>
      </BrowserRouter>
    )
  }
  it("should render", async () => {
    await act(async () => {
      setup([mockOngoingCrime], false)
    })
  })

  it("should render the loading spinner when loading is true", async () => {
    await act(async () => {
      setup([], true)
    })

    expect(screen.getByText("Loading map data...")).toBeVisible()
  })
})

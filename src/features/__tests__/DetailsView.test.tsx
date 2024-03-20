import { act, render, screen } from "@testing-library/react"
import { DetailsView } from "../DetailsView"
import { Provider as ReduxProvider, useSelector } from "react-redux"
import { store } from "../../shared/services/store"
import { useGetCrimeData } from "../../shared/hooks/useGetCrimeData"
import {
  mockOngoingCrime,
  mockOutcomeCrime,
} from "../../shared/mockData/crimes"
import { Crime } from "../../shared/types/crime"
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

describe("DetailsView", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  const setup = (data: Crime[], loading: boolean) => {
    ;(useGetCrimeData as jest.Mock).mockReturnValue({
      getDetailedData: jest
        .fn()
        .mockReturnValue({ data, postcode: mockPostcode }),
    })
    //@ts-ignore
    ;(useSelector as jest.Mock).mockReturnValue(loading)

    return render(
      <ReduxProvider store={store}>
        <DetailsView />
      </ReduxProvider>
    )
  }
  it("should render", async () => {
    await act(async () => {
      setup([mockOngoingCrime], false)
    })
  })

  it("should render the crime data", async () => {
    await act(async () => {
      setup([mockOutcomeCrime], false)
    })

    expect(
      screen.getByText(mockOutcomeCrime.location.street.name)
    ).toBeVisible()
  })

  it("should render the loading spinner when loading is true", async () => {
    await act(async () => {
      setup([], true)
    })

    expect(screen.getByText("Loading crime data...")).toBeVisible()
  })

  it("should render the NoCrimeState when theres no data", async () => {
    await act(async () => {
      setup([], false)
    })

    expect(screen.getByText("No crimes were found in this area")).toBeVisible()
  })
})

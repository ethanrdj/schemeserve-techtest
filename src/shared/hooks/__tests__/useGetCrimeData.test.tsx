import { act, renderHook } from "@testing-library/react"
import { Provider as ReduxProvider } from "react-redux"
import { useGetCrimeData } from "../useGetCrimeData"
import { store } from "../../services/store"
import { mockPostcode } from "../../mockData/postcodes"
import axios from "axios"

jest.mock("axios")

describe("useGetCrimeData", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = () => {
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: mockPostcode,
    })
    const { result } = renderHook(() => useGetCrimeData(), {
      wrapper: ({ children }) => (
        <ReduxProvider store={store}>{children}</ReduxProvider>
      ),
    })

    return result
  }
  it("getMultiplePostcodeData should add a postcode to foundPostcodes", async () => {
    const result = setup()

    await act(() => result.current.getMultiplePostcodeData("TW5 RL"))

    const { foundPostcodes } = result.current

    expect(foundPostcodes).toEqual([mockPostcode])
  })

  it("getPostcodeData should return the mock postcode", async () => {
    const result = setup()

    const data = await act(() => result.current.getPostcodeData("TW5 9RL"))

    expect(data).toEqual(mockPostcode)
  })
})

import axios from "axios"
import { MatchType, Postcode } from "../types/postcode"
import { Crime } from "../types/crime"
import { useDispatch, useSelector } from "react-redux"
import { addPostcodeToHistory } from "../services/slices/historySlice"
import {
  selectFoundPostcodes,
  setFoundPostcodes,
  setLoading,
} from "../services/slices/postcodesSlice"

export const useGetCrimeData = () => {
  const dispatch = useDispatch()
  const foundPostcodes = useSelector(selectFoundPostcodes)

  async function getMultiplePostcodeData(value: string) {
    const postcodes = value.split(",").map((code) => code.trim())
    dispatch(setLoading(true))
    try {
      for (const postcode of postcodes) {
        // this is a bit funky but it allows us to search multiple postcodes at once since there isn't a batch endpoint
        const { data: postcodeResponse } = await axios.get<Postcode>(
          `http://api.getthedata.com/postcode/${postcode}`
        )

        if (
          postcodeResponse.match_type === MatchType.UNIT_POSTCODE && // Only show fully matched post codes as they have a full data object including lat & lng needed to get the full crime counts
          !foundPostcodes
            .map(({ input }) => input)
            .includes(postcodeResponse.input)
        ) {
          dispatch(setFoundPostcodes(postcodeResponse))
          dispatch(addPostcodeToHistory(postcode))
        }
      }
    } catch (error) {
      console.error("Error fetching crime data:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function getPostcodeData(value: string) {
    dispatch(setLoading(true))
    try {
      const { data: postcodeResponse } = await axios.get<Postcode>(
        `http://api.getthedata.com/postcode/${value}`
      )

      return postcodeResponse
    } catch (error) {
      console.error("Error fetching crime data:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function getDetailedData(value: string) {
    dispatch(setLoading(true))
    try {
      const postcodeData = await getPostcodeData(value)

      if (postcodeData) {
        const { latitude, longitude } = postcodeData.data

        try {
          const detailedData = await axios.get<Crime[]>(
            `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
          )

          return { postcode: postcodeData, data: detailedData.data }
        } catch (error) {
          console.error("Error fetching crime data:", error)
        }
      }
    } catch (error) {
      console.error("Error fetching crime data:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getMultiplePostcodeData,
    foundPostcodes,
    getDetailedData,
    getPostcodeData,
  }
}

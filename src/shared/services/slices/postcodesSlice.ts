import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { Postcode } from "../../types/postcode"
import { lowercaseArray } from "../../utils/lowercaseArray"

export interface PostcodesState {
  foundPostcodes: Postcode[]
  loading: boolean
}

const initialState: PostcodesState = {
  foundPostcodes: [],
  loading: false,
}

const postcodesSlice = createSlice({
  name: "postcodes",
  initialState,
  reducers: {
    setFoundPostcodes: (state, action: PayloadAction<Postcode>) => {
      const lowercasePostcodes = state.foundPostcodes
        .map((postcode) => postcode.input)
        .map(lowercaseArray)
      if (!lowercasePostcodes.includes(action.payload.input.toLowerCase())) {
        state.foundPostcodes = [...state.foundPostcodes, action.payload]
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setFoundPostcodes, setLoading } = postcodesSlice.actions

export const selectFoundPostcodes = (state: RootState) =>
  state.postcodeSlice.foundPostcodes
export const selectLoadingState = (state: RootState) =>
  state.postcodeSlice.loading
export default postcodesSlice.reducer

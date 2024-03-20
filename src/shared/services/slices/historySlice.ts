import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { SearchHistory } from "../../types/searchHistory"
import { lowercaseArray } from "../../utils/lowercaseArray"

export interface HistoryState {
  searchHistory: SearchHistory
}

const initialState: HistoryState = {
  searchHistory: [],
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addPostcodeToHistory: (state, action: PayloadAction<string>) => {
      const lowercasePostcodes = state.searchHistory.map(lowercaseArray)
      if (!lowercasePostcodes.includes(action.payload.toLowerCase())) {
        state.searchHistory = [...state.searchHistory, action.payload]
      }
    },
    removePostcodeFromHistory: (state, action: PayloadAction<string>) => {
      const lowercasePostcodes = state.searchHistory.map(lowercaseArray)
      if (lowercasePostcodes.includes(action.payload.toLowerCase())) {
        state.searchHistory = state.searchHistory.filter(
          (postcode) => postcode !== action.payload
        )
      }
    },
    clearPostcodeHistory: (state) => {
      state.searchHistory = []
    },
  },
})

export const {
  addPostcodeToHistory,
  removePostcodeFromHistory,
  clearPostcodeHistory,
} = historySlice.actions

export const selectSearchHistory = (state: RootState) =>
  state.historySlice.searchHistory
export default historySlice.reducer

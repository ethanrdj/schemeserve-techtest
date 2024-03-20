import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage/session"
import HistoryReducer from "./slices/historySlice"
import PostcodeReducer from "./slices/postcodesSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["historySlice"], // Only these reducers will be persistent
}

const rootReducer = combineReducers({
  historySlice: HistoryReducer,
  postcodeSlice: PostcodeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

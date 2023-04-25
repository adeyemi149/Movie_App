import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice"
import movieReducer from "../features/movieSlice"
import detailReducer from "../features/detailSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer, 
    detail: detailReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

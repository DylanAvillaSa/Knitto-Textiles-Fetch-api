import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import imageReducer from "@/redux/imageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageReducer,
    // bookmark: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./features/character/characterSlice";

export const store = configureStore({
  reducer: {
    character: characterSlice,
  },
});

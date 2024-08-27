import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
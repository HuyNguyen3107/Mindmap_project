import { configureStore } from "@reduxjs/toolkit";
import { nodeSlice } from "./slice/nodeSlice";

export const store = configureStore({
  reducer: {
    node: nodeSlice.reducer,
  },
  devTools: true,
});

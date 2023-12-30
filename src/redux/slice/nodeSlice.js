import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: "0",
      type: "rootUpdater",
      data: { label: "My Mindmap" },
      position: { x: 0, y: 50 },
    },
  ],
};

export const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    update: (state, action) => {
      console.log(action.payload);
      state.nodes = action.payload;
    },
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

// Export the actions
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;

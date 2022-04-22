import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userEmail: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserLogOut: (state) => {
      state.userEmail = '';
    },
  },
});

export const { setActiveUser, setUserLogOut } = userSlice.actions;

export const selectUserEmail = (state) => state.user.userEmail;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickName: null,
  userEmail: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,

  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      userEmail: payload.userEmail,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => state,
  },
});

console.log("authSlice", authSlice);

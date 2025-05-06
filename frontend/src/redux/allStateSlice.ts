import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface problemState {
  // check user login or not
  isLogin: boolean;
  // profile
  profilRefresh: boolean;
  getProfile: any;
}

const initialState: problemState = {
  // check user login or not
  isLogin: false,
  // profile
  profilRefresh: false,
  getProfile: [],
};

export const allStateSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    //  check user login or not
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    // profile
    setProfilRefresh: (state) => {
      state.profilRefresh = !state.profilRefresh;
    },
    setGetProfile: (state, action) => {
      state.getProfile = action.payload;
    },
    //  Api Token
  },
});

export const {
  // check user login or not
  setIsLogin,
  // profile
  setProfilRefresh,
  setGetProfile,
} = allStateSlice.actions;

// check user login or not
export const selectIsLogin = (state: RootState) => state.problem.isLogin;
// profile
export const selectProfilRefresh = (state: RootState) =>
  state.problem.profilRefresh;
export const selectGetProfile = (state: RootState) => state.problem.getProfile;
// Api Token

export default allStateSlice.reducer;

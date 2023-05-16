import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegistrationUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("login, password, email", login, email, password);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {};

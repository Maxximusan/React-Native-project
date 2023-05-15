import { app } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const authRegistrationUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("login, password, email", login, email, password);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogInUser = () => async (dispatch, getState) => {};

export const authLogOutUser = () => async (dispatch, getState) => {};

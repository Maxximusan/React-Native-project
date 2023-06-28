import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  updateEmail,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const uploadUserAvatar = async (login, avatar) => {
  const response = await fetch(avatar);
  const file = await response.blob();
  const uniqueAvatarId = Date.now().toString();
  const storageRef = ref(storage, `usersAvatars/${login}${uniqueAvatarId}`);
  console.log("storageRefAVATAR", storageRef);
  const data = await uploadBytes(storageRef, file);
  console.log("dataAVATAR", data);

  const avatarUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${login}${uniqueAvatarId}`)
  );
  return avatarUrl;
};

export const authRegistrationUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: login });
      const userAvatar = await uploadUserAvatar(login, avatar);
      await updateProfile(user, { photoURL: userAvatar });
      await updateEmail(user, email);
      const { displayName, uid, photoURL } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
          userEmail: email,
          userPhoto: photoURL,
        })
      );
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

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
      };
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export const authLogOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authLogOut());
};

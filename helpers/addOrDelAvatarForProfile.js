import { updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase/config";
import { authSlice } from "../redux/auth/authReducer";

const storage2 = getStorage();

export const deleteUserPhoto = async () => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: "",
    });

    console.log("DELETE - OK!");
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const addUserPhoto = async (photoForDownload, dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: photoForDownload,
    });
    const { photoURL, email, displayName, uid } = auth.currentUser;
    dispatch(
      authSlice.actions.updateUserProfile({
        userPhoto: photoURL,
        nickName: displayName,
        userId: uid,
        userEmail: email,
      })
    );
    console.log("Added new photo!");
  } catch (error) {
    // .then(() => {
    //   console.log("Added new photo!");
    // })
    console.log("error", error);
  }
};

export const uploadNewUserAvatar = async (login, avatar) => {
  const response = await fetch(avatar);
  const file = await response.blob();
  const storageRef = ref(storage, `usersAvatars/${login}1`);
  await uploadBytes(storageRef, file);
  const avatarUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${login}1`)
  );
  return avatarUrl;
};

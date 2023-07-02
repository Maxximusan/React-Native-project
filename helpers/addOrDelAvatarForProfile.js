import { updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase/config";
import { authSlice } from "../redux/auth/authReducer";


export const deleteUserPhoto = async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: "",
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

    console.log("Delete user photo - OK!");
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
    console.log("addUserPhoto - error:", error);
  }
};

export const uploadNewUserAvatar = async (login, avatar) => {
  try{
  const response = await fetch(avatar);
  const file = await response.blob();
  const uniqueAvatarId = Date.now().toString();
  const storageRef = ref(storage, `usersAvatars/${login}${uniqueAvatarId}`);
  await uploadBytes(storageRef, file);
  const avatarUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${login}${uniqueAvatarId}`)
  );
    return avatarUrl;
  } catch (error) {
    console.log("uploadNewUserAvatar - error:", error);
    }
};

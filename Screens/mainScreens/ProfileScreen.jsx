import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestoreDB, auth } from "../../firebase/config";
import { UserAvatar } from "../../components/AvatarBox/UserAvatar";
import { authLogOutUser } from "../../redux/auth/authOperations";
import { PostsList } from "../../components/PostsList/PostList";
import { likedPosts } from "../../helpers/likeHandler";
import { pickImageAsync } from "../../helpers/imagePicker";
import {
  deleteUserPhoto,
  addUserPhoto,
  uploadNewUserAvatar,
} from "../../helpers/addOrDelAvatarForProfile";
import { useOrientationScreen } from "../../hooks/screenOrientation";
import { useSortPosts } from "../../hooks/sortPosts";
import { useLoaderOnScreenRotation } from "../../hooks/loader";
import { ContextUserRemovesPost } from "../../context/context";

export const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [updateUserPosts, setUpdateUserPosts] = useState([]);

  const orientation = useOrientationScreen();
  const sortPosts = useSortPosts(userPosts);
  const loader = useLoaderOnScreenRotation(orientation.isPortrait);

  const { userId, userPhoto } = useSelector((state) => state.auth);

  const { uid, displayName, photoURL } = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  useEffect(() => {
    setUpdateUserPosts(likedPosts(sortPosts, userId));
  }, [sortPosts]);

  const getUserPosts = async () => {
    const q = query(
      collection(firestoreDB, "posts"),
      where("userId", "==", userId)
    );
    await onSnapshot(
      q,
      (snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getUserAvatar = async () => {
    try {
      const result = await pickImageAsync();
      const photoForDownload = await uploadNewUserAvatar(displayName, result);
      addUserPhoto(photoForDownload, dispatch);
      // console.log("auth.currentUs", auth.currentUser);
    } catch (error) {
      console.log("getUserAvatar-error:", error);
    }
  };

  const deleteCommentsForPost = async (id) => {
    try {
      const allPostComments = await getDocs(
        collection(firestoreDB, "posts", id, "comments")
      ).then((res) => {
        res.forEach((element) => {
          console.log("fuck FUCK", element);
          deleteDoc(doc(firestoreDB, "posts", id, "comments", element.id));
        });
      });
      return allPostComments;
    } catch (error) {
      console.log("deleteCommentsForPost - error:", error);
    }
  };

  const deletePostFromFirebase = async (id) => {
    try {
      const goodByePost = await deleteDoc(doc(firestoreDB, "posts", id));
      return goodByePost;
    } catch (error) {
      console.log("deletePostFromFirebase - error:", error);
    }
  };

  const logOut = () => {
    dispatch(authLogOutUser());
  };

  const deleteAvatar = () => {
    deleteUserPhoto(dispatch);
  };

  const deletePost = (id) => {
    deleteCommentsForPost(id);
    deletePostFromFirebase(id);
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" color="#00ff00" animating={loader} />
      ) : (
        <ImageBackground
          style={
            orientation.isPortrait
              ? { ...styles.image, paddingTop: 0 }
              : styles.image
          }
          source={require("../../assets/images/Photo-BG.jpg")}
        >
          <View
            style={
              orientation.isPortrait
                ? { ...styles.profileContainer, paddingTop: 12 }
                : styles.profileContainer
            }
          >
            <View style={orientation.isPortrait ? { display: "none" } : {}}>
              <UserAvatar
                getAvatarPhoto={getUserAvatar}
                avatar={photoURL}
                deleteAvatarPhoto={deleteAvatar}
              />
              <TouchableOpacity style={styles.profileLogoutBtn}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => logOut()}
                />
              </TouchableOpacity>
              <Text style={styles.profileNickName}>{displayName}</Text>
            </View>
            <ContextUserRemovesPost.Provider value={deletePost}>
              <PostsList
                isProfileScreen={true}
                updatedPostArray={updateUserPosts}
                userId={userId}
                navigation={navigation}
                posts={userPosts}
                orientation={orientation.isPortrait}
              />
            </ContextUserRemovesPost.Provider>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 812,
    paddingTop: 147,
  },
  profileContainer: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
  },
  profileLogoutBtn: {
    position: "absolute",

    bottom: 117,
    left: 175,
  },
  profileNickName: {
    marginBottom: 32,
    fontFamily: "roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontSize: 30,
    lineHeight: 35,
  },
});

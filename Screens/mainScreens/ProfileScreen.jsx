import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreDB, auth } from "../../firebase/config";
import { UserAvatar } from "../../components/AvatarBox/UserAvatar";
import { authLogOutUser } from "../../redux/auth/authOperations";
import { PostsList } from "../../components/PostsList/PostList";
import { likedPosts } from "../../helpers/likeHandler";
// import { uploadUserAvatar } from "../../redux/auth/authOperations";
import { pickImageAsync } from "../../helpers/imagePicker";
import {
  deleteUserPhoto,
  addUserPhoto,
  uploadNewUserAvatar,
} from "../../helpers/addOrDelAvatarForProfile";
import { useOrientationScreen } from "../../hooks/ScreenOrientation";

export const ProfileScreen = ({ navigation }) => {
  const orientation = useOrientationScreen();
  const [userPosts, setUserPosts] = useState([]);
  const [updateUserPosts, setUpdateUserPosts] = useState([]);
  // const [newUserAvatar, setNewUserAvatar] = useState(null);
  const { userId, userPhoto } = useSelector((state) => state.auth);

  const { uid, displayName, photoURL } = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  useEffect(() => {
    setUpdateUserPosts(likedPosts(userPosts, userId));
  }, [userPosts]);

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
    const result = await pickImageAsync();
    // setNewUserAvatar(result);
    const photoForDownload = await uploadNewUserAvatar(displayName, result);
    addUserPhoto(photoForDownload, dispatch);
    console.log("auth.currentUs", auth.currentUser);
  };

  const logOut = () => {
    dispatch(authLogOutUser());
  };

  const deleteAvatar = () => {
    deleteUserPhoto(dispatch);
    // setNewUserAvatar(null);
  };
  return (
    <View style={styles.container}>
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
                // color="#f50e0e"
                onPress={() => logOut()}
              />
            </TouchableOpacity>
            <Text style={styles.profileNickName}>{displayName}</Text>
          </View>
          <PostsList
            isProfileScreen={true}
            updatedPostArray={updateUserPosts}
            userId={userId}
            navigation={navigation}
            posts={userPosts}
            orientation={orientation.isPortrait}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alighItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 812,
    paddingTop: 147,

    // paddingTop: 60,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    // paddingTop: 12,
  },
  profileLogoutBtn: {
    position: "absolute",
    // top: -75,
    // right: -170,
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

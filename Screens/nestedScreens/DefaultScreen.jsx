import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, AntDesign, Octicons } from "@expo/vector-icons";

import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";
import { PostsList } from "../../components/PostsList/PostList";
import { addLike, likedPosts } from "../../helpers/likeHandler";
import { useOrientationScreen } from "../../hooks/screenOrientation";
import { useSortPosts } from "../../hooks/sortPosts";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // const [sortPosts, setSortPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState([]);

  const orientation = useOrientationScreen();
  console.log(orientation);
  const sortPosts = useSortPosts(updatedPosts);

  const { userId } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    await onSnapshot(
      collection(firestoreDB, "posts"),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // useEffect(() => {
  //   sortPostsByCreatedDate(posts);
  // }, [posts]);

  useEffect(() => {
    setUpdatedPosts(likedPosts(posts, userId));
  }, [posts]);

  // console.log("updatedPosts", updatedPosts);

  // const sortPostsByCreatedDate = (allPosts) => {
  //   let result = [...allPosts].sort((prev, next) => {
  //     if (prev.timeOfCreation < next.timeOfCreation) {
  //       return 1;
  //     } else return -1;
  //   });
  //   console.log("SORTED-POSTS", result);
  //   setSortPosts(result);
  //   return result;
  // };

  return (
    <View style={styles.container}>
      <PostsList
        isProfileScreen={false}
        updatedPostArray={sortPosts}
        userId={userId}
        navigation={navigation}
        posts={posts}
        orientation={orientation.isPortrait}
      />
      {/* <FlatList
        data={sortPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.userInfoContainer}>
              <Image
                style={styles.userPhoto}
                source={{ uri: item.userPhoto }}
              />
              <View style={styles.userInfo}>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.userEmail}>{item.userEmail}</Text>
              </View>
            </View>
            <View
              style={
                orientation.isPortrait
                  ? {
                      marginBottom: 10,
                      // justifyContent: "center",
                      alignItems: "center",
                    }
                  : { marginBottom: 10 }
              }
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: 360, height: 240 }}
              />
            </View>
            <View
              style={
                orientation.isPortrait
                  ? { marginBottom: 10, alignItems: "center" }
                  : { marginBottom: 10 }
              }
            >
              <Text style={styles.postTitle}>{item.comment}</Text>
            </View>

            <View style={styles.statsContainer}>
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <FontAwesome
                    name="comment"
                    size={24}
                    color={item.commentsAmount === 0 ? "#BDBDBD" : "#FF6C00"}
                  />
                  <Text style={styles.commentsAmount}>
                    {item.commentsAmount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addLike(posts, item.id, userId)}
                  style={{ flexDirection: "row", marginLeft: 25 }}
                >
                  <AntDesign
                    name="like2"
                    size={18}
                    color={!item.isLiked ? "#BDBDBD" : "#FF6C00"}
                  />
                  <Text style={{ color: "#212121", marginLeft: 5 }}>
                    {item.likesNumber}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("Map", { location: item.location });
                }}
              >
                <Octicons name="location" size={20} color="#BDBDBD" />
                <Text style={styles.locationItemText}>{item.terrain}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  // post: {
  //   marginHorizontal: 16,
  //   marginBottom: 35,
  // },
  // userInfoContainer: {
  //   justifyContent: "flex-start",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 32,
  // },
  // userInfo: {
  //   justifyContent: "center",
  // },
  // userPhoto: {
  //   height: 60,
  //   width: 60,
  //   borderRadius: 16,
  //   marginRight: 10,
  // },
  // nickName: {
  //   fontFamily: "roboto-700",
  //   fontSize: 13,
  //   color: "#212121",
  // },
  // userEmail: {
  //   fontSize: 11,
  //   color: "rgba(33, 33, 33, 0.8)",
  // },
  // postTitle: {
  //   fontFamily: "roboto-700",
  //   fontStyle: "normal",
  //   fontSize: 16,
  //   lineHeight: 19,
  //   color: "#212121",
  // },
  // statsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },

  // commentsAmount: {
  //   color: "#212121",
  //   marginLeft: 5,
  //   fontSize: 18,
  // },
  // locationItemText: {
  //   marginLeft: 5,
  //   fontFamily: "roboto-400",
  //   fontStyle: "normal",
  //   fontSize: 16,
  //   lineHeight: 19,
  //   textDecorationLine: "underline",
  //   color: "#212121",
  // },
});

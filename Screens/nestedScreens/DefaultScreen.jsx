import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";


import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";
import { PostsList } from "../../components/PostsList/PostList";
import { likedPosts } from "../../helpers/likeHandler";
import { useOrientationScreen } from "../../hooks/screenOrientation";
import { useSortPosts } from "../../hooks/sortPosts";
import { useLoaderOnScreenRotation } from "../../hooks/loader";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState([]);

  const orientation = useOrientationScreen();
  console.log(orientation);
  const sortPosts = useSortPosts(updatedPosts);
  const loader = useLoaderOnScreenRotation(orientation.isPortrait);

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

  useEffect(() => {
    setUpdatedPosts(likedPosts(posts, userId));
  }, [posts]);

  // console.log("updatedPosts", updatedPosts);

  return (
    <View style={styles.container}>
      {loader ? (
        
        <ActivityIndicator size="large" color="#00ff00" animating={loader} />
      ) : (
        <PostsList
          isProfileScreen={false}
          updatedPostArray={sortPosts}
          userId={userId}
          navigation={navigation}
          posts={posts}
          orientation={orientation.isPortrait}
        />
      )}
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
});

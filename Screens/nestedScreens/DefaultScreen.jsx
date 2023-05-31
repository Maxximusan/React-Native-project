import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

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

  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
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
              style={{
                marginBottom: 10,
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: 360, height: 240 }}
              />
            </View>
            <View>
              <Text style={styles.postTitle}>{item.comment}</Text>
            </View>

            <View>
              <View style={styles.statsContainer}>
                <TouchableOpacity
                  style={styles.commentItem}
                  onPress={() =>
                    navigation.navigate("Comments", { postId: item.id })
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
              </View>
            </View>
            <View>
              <Button
                title="go to Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              {/* <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              /> */}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alighItems: "center",
    flexGrow: 1,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  post: {
    marginHorizontal: 16,
    marginBottom: 35,
  },
  userInfoContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userInfo: {
    justifyContent: "center",
  },
  userPhoto: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  nickName: {
    fontFamily: "roboto-700",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postTitle: {
    fontFamily: "roboto-700",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  statsContainer: {
    flexDirection: "row",
    // alignContent: "space-between",
    alignItems: "center",
  },
  commentItem: {
    flexDirection: "row",
  },
  commentsAmount: {
    color: "#212121",
    marginLeft: 5,
    fontSize: 18,
  },
});

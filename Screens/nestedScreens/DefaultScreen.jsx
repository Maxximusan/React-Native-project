import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, Button, Text } from "react-native";

import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // console.log("route.params", route.params);

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
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="go to Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
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
    justifyContent: "center",
    // alighItems: "center",
  },
});

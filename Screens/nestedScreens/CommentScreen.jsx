import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";

export const CommentScreen = ({ route }) => {
  const { postId } = route.params;
  // или
  // const postId = route.params.postId;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createComment = async () => {
    try {
      const docRef = await addDoc(
        collection(firestoreDB, "posts", postId, "comments"),
        {
          comment,
          nickName,
        }
      );

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const getAllPosts = async () => {
    await onSnapshot(
      collection(firestoreDB, "posts", postId, "comments"),
      (snapshot) => {
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
  };

  const submitAddComment = async () => {
    await createComment();
    setComment("");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={{ marginBottom: 32 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder="Коментарий"
          placeholderTextColor={`#ff0000`}
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={submitAddComment}>
        <Text style={styles.sendTitle}> Добавить коментарий </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: `#0099ff`,
    backgroundColor: `#3275cd`,
    borderRadius: 15,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendTitle: {
    color: `#ffd700`,
    fontSize: 20,
  },
  input: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",

    color: `#212121`,
  },
});

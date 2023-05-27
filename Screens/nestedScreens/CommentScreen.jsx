import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "../../firebase/config";

export const CommentScreen = ({ route }) => {
  const { postId } = route.params;
  // или
  // const postId = route.params.postId;

  const [comment, setComment] = useState("");
  const { nickName } = useSelector((state) => state.auth);

  const createComment = async () => {
    try {
      const addComment = await addDoc(
        collection(firestoreDB, "posts", postId, "comments"),
        {
          comment,
          nickName,
        }
      );

      console.log("Document written with ID: ", addComment.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder="Коментарий"
          placeholderTextColor={`#ff0000`}
          // value={comment}
          onChangeText={setComment}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={createComment}>
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

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",

    color: `#212121`,
  },
});

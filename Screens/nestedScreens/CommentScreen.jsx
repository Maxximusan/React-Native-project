import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";

import { firestoreDB } from "../../firebase/config";

export const CommentScreen = ({ route }) => {
  const { postId, photo } = route.params;
  // или
  // const postId = route.params.postId;

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentsAmount, setCommentsAmount] = useState(0);
  const { nickName, userPhoto, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    updateCommentsAmount(allComments.length);
  }, [allComments]);

  useEffect(() => {
    updateCommentsAmountForFirestore();
  }, [commentsAmount]);

  const createComment = async () => {
    try {
      const docRef = await addDoc(
        collection(firestoreDB, "posts", postId, "comments"),
        {
          comment,
          nickName,
          userPhoto,
          userId,
          timeOfCreation: new Timestamp.now().toMillis(),
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
      },
      (error) => {
        console.log(error);
      }
    );
  };

  allComments.map((comment) => {
    dayjs(comment.timeOfCreation).format("DD MMMM, YYYY | HH:mm");
  });

  const submitAddComment = async () => {
    await createComment();
    setComment("");
    keyboardHide();
  };

  const updateCommentsAmount = (allComments) => {
    setCommentsAmount(allComments);
  };

  const updateCommentsAmountForFirestore = async () => {
    const postsCollectionRef = doc(firestoreDB, "posts", postId);
    await updateDoc(postsCollectionRef, { commentsAmount });
  };

  const keyboardHide = () => {
    Keyboard.dismiss();

    setShowKeyboard(false);
  };

  const activeInputHandler = () => {
    setShowKeyboard(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{ uri: photo }} />
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View
                style={
                  item.userId === userId
                    ? styles.currentUserComment
                    : styles.otherUserComment
                }
              >
                <Image
                  source={{ uri: item.userPhoto }}
                  style={styles.commentUserPhoto}
                />
                <View style={styles.commentContainer}>
                  <Text style={{ color: "#0a860a" }}>{item.nickName}</Text>
                  <Text>{item.comment}</Text>
                  <Text style={{ fontSize: 10 }}>
                    {dayjs(item.timeOfCreation).format("DD MMMM, YYYY | HH:mm")}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={25}
      > */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            textAlign={"left"}
            placeholder="Введите Коментарий"
            placeholderTextColor={`#ff0000`}
            value={comment}
            onChangeText={setComment}
            onFocus={() => activeInputHandler()}
            multiline={true}
            numberOfLines={5}
          />

          <TouchableOpacity style={styles.sendBtn} onPress={submitAddComment}>
            {/* <Text style={styles.sendTitle}> Добавить коментарий </Text> */}
            <AntDesign name="arrowup" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
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
    // marginHorizontal: 30,
    // height: 40,
    // borderWidth: 2,
    // borderColor: `#0099ff`,
    // backgroundColor: `#3275cd`,
    // borderRadius: 15,
    // marginBottom: 40,

    position: "absolute",
    right: 8,
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  sendTitle: {
    color: `#ffd700`,
    fontSize: 20,
  },
  inputContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    marginHorizontal: 16,
    width: "90%",
  },
  input: {
    // marginHorizontal: 10,
    // paddingTop: 10,
    // borderColor: "transparent",
    // borderBottomColor: "#E8E8E8",
    height: 50,
    // minHeight: 50,
    maxHeight: 100,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#E8E8E8",
    backgroundColor: "#e9e3e3",

    fontFamily: "roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,

    // color: `#212121`,
  },
  photoContainer: {
    paddingTop: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  photo: {
    height: 240,
    width: "100%",
    // height: "50%",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  currentUserComment: {
    flexDirection: "row-reverse",
    flexWrap: "nowrap",
    paddingRight: 60,
    width: "100%",
    marginBottom: 24,
  },
  otherUserComment: {
    textAlign: "right",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingRight: 60,
    width: "100%",
    marginBottom: 24,
  },
  commentUserPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
});

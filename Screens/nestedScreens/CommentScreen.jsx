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
  ActivityIndicator,
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
import { useOrientationScreen } from "../../hooks/screenOrientation";
import { useSortComments } from "../../hooks/sortComments";
import { useLoaderOnScreenRotation } from "../../hooks/loader";

export const CommentScreen = ({ route }) => {
  const { postId, photo } = route.params;
  // или
  // const postId = route.params.postId;

  const [height, setHeight] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentsAmount, setCommentsAmount] = useState(0);

  const orientation = useOrientationScreen();
  const sortComments = useSortComments(allComments);
  const loader = useLoaderOnScreenRotation(orientation.isPortrait);

  const { nickName, userPhoto, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    setCommentsAmount(allComments.length);
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

      console.log("Document 'comments' written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document 'comments': ", error);
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

  // allComments.map((comment) => {
  //   dayjs(comment.timeOfCreation).format("DD MMMM, YYYY | HH:mm");
  //   // console.log("LOOK", dayjs(comment.timeOfCreation).unix());

  // });

  const submitAddComment = async () => {
    await createComment();
    setComment("");
    keyboardHide();
    setHeight(null);
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
    <>
      {loader ? (
        <ActivityIndicator size="large" color="#00ff00" animating={loader} />
      ) : (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.container} onStartShouldSetResponder={() => true}>
            {orientation.isPortrait ? null : (
              <View style={styles.photoContainer}>
                <Image style={styles.photo} source={{ uri: photo }} />
              </View>
            )}
            {sortComments && (
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                  data={sortComments}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      onStartShouldSetResponder={() => true}
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
                        <Text style={{ color: "#0a860a" }}>
                          {item.nickName}
                        </Text>
                        <Text>{item.comment}</Text>
                        <Text style={{ fontSize: 10 }}>
                          {dayjs(item.timeOfCreation).format(
                            "DD MMMM, YYYY | HH:mm"
                          )}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </SafeAreaView>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.input, height: Math.max(50, height) }}
                textAlign={"left"}
                placeholder="Введите Коментарий"
                placeholderTextColor={`#ff0000`}
                value={comment}
                onChangeText={(value) => setComment(value)}
                onFocus={() => activeInputHandler()}
                multiline={true}
                // numberOfLines={5}
                onContentSizeChange={({
                  nativeEvent: {
                    contentSize: { height },
                  },
                }) => setHeight(height)}
              />

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={submitAddComment}
              >
                <AntDesign name="arrowup" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  commentContainer: {
    borderWidth: 0.5,
    borderColor: "#0882e6",
    marginHorizontal: 10,
    padding: 10,

    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  sendBtn: {
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
    alignSelf: "center",
    width: "100%",
  },
  input: {
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#E8E8E8",
    backgroundColor: "#e9e3e3",

    fontFamily: "roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  photoContainer: {
    paddingTop: 12,
    alignItems: "center",

    marginBottom: 12,
  },
  photo: {
    height: 120,
    width: "50%",

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

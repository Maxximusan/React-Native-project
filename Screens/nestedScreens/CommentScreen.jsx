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
  Dimensions,
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
import { useOrientationScreen } from "../../hooks/ScreenOrientation";

export const CommentScreen = ({ route }) => {
  const { postId, photo } = route.params;
  // или
  // const postId = route.params.postId;
  // const width = Dimensions.get("window").width;
  // const heightD = Dimensions.get("window").height;
  // const [screenHorizontally, setScreenHorizontally] = useState(false);
  const orientation = useOrientationScreen();
  const [height, setHeight] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [sortComments, setSortComments] = useState([]);
  const [commentsAmount, setCommentsAmount] = useState(0);
  const { nickName, userPhoto, userId } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const width = Dimensions.get("window").width;
  //   const height = Dimensions.get("window").height;

  //   width > height ? setScreenHorizontally(true) : setScreenHorizontally(false);
  // }, []);

  // useEffect(() => {
  //   // const { height, width } = Dimensions.get("window");
  //   const onChange = () => {
  //     console.log("height", heightD);
  //     console.log("width", width);

  //     width > heightD
  //       ? setScreenHorizontally(true)
  //       : setScreenHorizontally(false);
  //   };

  //   const dimensionsHandler = Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     dimensionsHandler?.remove();
  //   };
  // }, []);
  // useEffect(() => {
  //   const onChange = (result) => {
  //     // setScreenInfo(result.screen);
  //     // console.log("height", height);
  //     // console.log("width", width);
  //     console.log("resultscreen", result.window);
  //     console.log("height", result.window.height);
  //     console.log("width", result.window.width);

  //     result.window.width > result.window.height
  //       ? setScreenHorizontally(true)
  //       : setScreenHorizontally(false);
  //   };

  //   const dimensionsHandler = Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     dimensionsHandler?.remove();
  //   };
  // }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    updateCommentsAmount(allComments.length);
    sortCommentByCreatedDate(allComments);
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
    // console.log("LOOK", dayjs(comment.timeOfCreation).unix());
  });
  console.log("sortedcomments", sortComments);
  const sortCommentByCreatedDate = (allComments) => {
    let result = [...allComments].sort((prev, next) => {
      if (prev.timeOfCreation > next.timeOfCreation) {
        return 1;
      } else return -1;
    });
    console.log("RESULT", result);
    setSortComments(result);
    return result;
  };
  const submitAddComment = async () => {
    await createComment();
    setComment("");
    keyboardHide();
    setHeight(null);
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
                    <Text style={{ color: "#0a860a" }}>{item.nickName}</Text>
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

          <TouchableOpacity style={styles.sendBtn} onPress={submitAddComment}>
            <AntDesign name="arrowup" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    marginHorizontal: 16,
    // backgroundColor: "#ffffff",
  },
  commentContainer: {
    borderWidth: 0.5,
    borderColor: "#0882e6",
    marginHorizontal: 10,
    padding: 10,
    // marginBottom: 10,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  sendBtn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    // bottom: -20,
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
    // position: "absolute",
    // bottom: 10,
    alignSelf: "center",
    // marginHorizontal: 16,
    width: "100%",
    // height: 50,
    // marginBottom: 28,
  },
  input: {
    // minHeight: 50,
    // maxHeight: 51,

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
    // marginHorizontal: 16,
    marginBottom: 12,
  },
  photo: {
    height: 120,
    width: "50%",
    // height: "50%",
    // marginHorizontal: 16,
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

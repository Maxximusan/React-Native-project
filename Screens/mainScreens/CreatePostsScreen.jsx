import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
// import { TouchableOpacity } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5, SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { storage, firestoreDB } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [foto, setFoto] = useState(null);
  const [comment, setComment] = useState("");
  const [terrain, setTerrain] = useState("");
  const [location, setLocation] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const isFocused = useIsFocused();

  const { userId, nickName, userEmail, userPhoto } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toogleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    try {
      const photo = await snap.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();

      const savePhoto = await MediaLibrary.createAssetAsync(photo.uri);
      console.log("location", location);
      // console.log("lalitude", location.coords.latitude);
      // console.log("longitude", location.coords.longitude);
      setFoto(photo.uri);

      console.log("photo", photo);
      console.log("SAVEphoto", savePhoto);

      setLocation(location);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();

    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen");
    setComment("");
    setTerrain("");
    setFoto(null);
  };

  const uploadPostToServer = async () => {
    const createdPhoto = await uploadPhotoToServer();
    try {
      const createPost = await addDoc(collection(firestoreDB, "posts"), {
        photo: createdPhoto,
        comment,
        terrain,
        location: location.coords,
        userId,
        nickName,
        userEmail,
        userPhoto,
        commentsAmount: 0,
      });
      console.log("Document written with ID: ", createPost.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(foto);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    console.log("storageRef", storageRef);
    const data = await uploadBytes(storageRef, file);
    console.log("data", data);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    console.log("processedPhoto", processedPhoto);

    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={213}
      >
        {isFocused && (
          <Camera style={styles.camera} type={type} ref={setSnap}>
            {foto && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: foto }}
                  style={{ height: 120, width: 120, borderRadius: 10 }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
              <FontAwesome5 name="camera-retro" size={40} color="pink" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changeCamera}
              onPress={() => toogleCameraType()}
            >
              <FontAwesome name="exchange" size={30} color="white" />
            </TouchableOpacity>
          </Camera>
        )}
        <View style={styles.form}>
          <View style={{ marginBottom: 32 }}>
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholder="Название..."
              placeholderTextColor={`#ff0000`}
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
          </View>
          <View style={{ marginBottom: 32 }}>
            <SimpleLineIcons
              style={styles.terrainIcon}
              name="location-pin"
              size={24}
              color="#BDBDBD"
            />
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholder="Местность..."
              placeholderTextColor={`#ff0000`}
              value={terrain}
              onChangeText={(text) => {
                setTerrain(text);
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
            <Text style={styles.sendTitle}> Опубликовать </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    height: "50%",
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  snapContainer: {
    borderWidth: 1,
    borderColor: `#ee82ee`,
    backgroundColor: "rgba(119, 108, 108, 0.178)",
    borderRadius: 50,
    width: 70,
    height: 70,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },

  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: `#7fff00`,
    backgroundColor: `#32cd32`,
    borderRadius: 15,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendTitle: {
    color: `#ffd700`,
    fontSize: 20,
  },
  form: {
    // backgroundColor: "#8f7474",
    paddingHorizontal: 16,
    marginTop: 45,
    borderWidth: 1,
    borderColor: "transparent",
  },
  input: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 24,

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",

    color: `#212121`,
  },
  terrainIcon: {
    position: "absolute",
  },
  changeCamera: {
    position: "absolute",
    left: 323,
    top: 10,
  },
});

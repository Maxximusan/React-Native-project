import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
// import { TouchableOpacity } from "react-native-gesture-handler";

export const CreatePostsScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await snap.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location);
    console.log("lalitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    setFoto(photo.uri);
    // console.log("camera ---->", photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("Публикации", { foto });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setSnap}>
        {foto && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: foto }}
              style={{ height: 150, width: 150, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}> SNAP </Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
          <Text style={styles.sendTitle}> SEND </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    height: "70%",
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  snapContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 50,
    width: 70,
    height: 70,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  snap: {
    color: "#fff",
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
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendTitle: {
    color: `#7fff00`,
    fontSize: 20,
  },
});

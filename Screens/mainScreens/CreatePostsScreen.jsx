import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";

export const CreatePostsScreen = () => {
  const [snap, setSnap] = useState(null);
  const [foto, setFoto] = useState(null);

  const takePhoto = async () => {
    const photo = await snap.takePictureAsync();
    setFoto(photo.uri);
    // console.log("camera ---->", photo.uri);
    console.log("photo", photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setSnap}>
        {foto && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: foto }} style={{ height: 100, width: 100 }} />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}> SNAP </Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    height: 300,

    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,

    alignItems: "center",
  },

  snapContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 50,
    width: 70,
    height: 70,
    marginTop: 200,
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
  },
});

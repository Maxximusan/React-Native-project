import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity style={styles.snapContainer} onPress={() => {}}>
          <Text style={styles.snap}> SNAP </Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },

  camera: {
    height: 300,
    marginTop: 20,

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
});

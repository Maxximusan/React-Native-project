import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PostsScreen = ({ route }) => {
  console.log("route.params", route.params);
  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alighItems: "center",
  },
});

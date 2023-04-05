import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  // KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/screen-2.webp")}
      >
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}
        <View
          style={styles.form}
          // style={{ ...styles.form, marginBottom: isShowKeyboard ? 40 : 100 }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.inputTitle}>EMAIL</Text>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              // onFocus={() => setIsShowKeyboard(true)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.inputTitle}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              secureTextEntry={true}
              // onFocus={() => setIsShowKeyboard(true)}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.4}
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>SING IN</Text>
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
        {/* <View style={styles.innerBox}>
          <Text style={styles.text}>life is good...</Text>
        </View> */}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },

  form: {
    marginHorizontal: 40,
    marginBottom: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: `#90ee90`,
    // margin: 20,
    height: 40,
    borderRadius: 6,
    color: `#000080`,
  },

  inputTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: `#ff4500`,
  },

  btn: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#ffb6c1",
        borderColor: "transparent",
      },
    }),
    // backgroundColor: Platform.OS === "ios" ? "transparent" : "#ffb6c1",
    // borderColor: Platform.OS === "ios" ? "#f0f8ff" : "transparent",
  },

  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : `#2e8b57`,
    fontSize: 20,
  },

  // text: {
  //   color: "blue",
  //   fontSize: 30,
  //   textAlign: "center",
  // },

  // innerBox: {
  //   borderWidth: 1,
  //   borderColor: "red",
  //   padding: 20,
  //   borderRadius: 10,
  //   width: 300,

  // },
});

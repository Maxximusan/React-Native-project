import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  // Text,
  View,
  // ImageBackground,
  // TextInput,
  // TouchableOpacity,
  // Keyboard,
  // TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

import { LoginScreen } from "./Screens/LoginScreen";
// const initialState = {
//   email: "",
//   password: "",
// };

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [state, setstate] = useState(initialState);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [fontsLoaded] = useFonts({
    "roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      // console.log("width", width);
      setdimensions(width);
    };
    const addEvLis = Dimensions.addEventListener("change", onChange);
    return () => {
      addEvLis?.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const keyboardHide = () => {
  //   Keyboard.dismiss();
  //   console.log(state);
  //   setstate(initialState);
  // };

  return (
    <View style={styles.mainContainer} onLayout={onLayoutRootView}>
      <LoginScreen dimensions={dimensions} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  // image: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },

  // formContainer: {
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 16,
  // },

  // form: {
  //   // marginHorizontal: 40,
  //   marginBottom: 40,
  //   // backgroundColor: "#fff",
  //   // padding: 92 16 78 16
  //   // paddingHorizontal: 16,
  // },

  // input: {
  //   borderWidth: 1,
  //   borderColor: `#90ee90`,
  //   // margin: 20,
  //   height: 40,
  //   borderRadius: 6,
  //   color: `#212121`,
  //   outlineColor: "#FF6C00",
  // },

  // inputTitle: {
  //   fontSize: 18,
  //   marginBottom: 10,
  //   color: `#ff4500`,
  // },

  // btn: {
  //   height: 51,
  //   borderRadius: 100,
  //   borderWidth: 1,
  //   // marginHorizontal: 16,
  //   justifyContent: "center",
  //   alignItems: "center",

  //   backgroundColor: "#FF6C00",
  //   borderColor: "transparent",
  // },

  // btnTitle: {
  //   color: "#FFFFFF",
  //   fontSize: 16,
  //   fontFamily: "roboto-400",
  // },

  // header: {
  //   alignItems: "center",
  //   marginBottom: 33,
  // },

  // headerTitle: {
  //   fontSize: 30,
  //   lineHeight: 35,
  //   color: `#212121`,
  //   fontFamily: "roboto-500",
  // },
});

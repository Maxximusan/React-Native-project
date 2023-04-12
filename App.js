import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
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

  return (
    <View style={styles.mainContainer} onLayout={onLayoutRootView}>
      <RegistrationScreen dimensions={dimensions} />
      {/* <LoginScreen dimensions={dimensions} /> */}
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
});

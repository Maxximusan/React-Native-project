import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import { ContextDimensions } from "./context/context";
import { store } from "./redux/store";
import { Main } from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  //позволяет определить ширину экрана
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

  //для подключения шрифтов
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
      <Provider store={store}>
        <ContextDimensions.Provider value={{ dimensions }}>
          <Main />
        </ContextDimensions.Provider>
      </Provider>
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

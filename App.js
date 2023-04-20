import React, { useState, useEffect, useCallback } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./Screens/Auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import { ContextDimensions } from "./context/context";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

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
      <NavigationContainer>
        <ContextDimensions.Provider value={{ dimensions }}>
          <AuthStack.Navigator>
            <AuthStack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegistrationScreen}
            />
            <AuthStack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          </AuthStack.Navigator>
          {/* <RegistrationScreen dimensions={dimensions} /> */}
          {/* <LoginScreen dimensions={dimensions} /> */}
        </ContextDimensions.Provider>
      </NavigationContainer>

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

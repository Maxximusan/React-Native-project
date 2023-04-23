import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./Screens/Auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import { HomeScreen } from "./Screens/HomeScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </AuthStack.Navigator>
    );
  } else {
    return <HomeScreen />;
  }
};

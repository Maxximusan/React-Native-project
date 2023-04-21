import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./Screens/Auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

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
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
};

import React from "react";
// import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen } from "../nestedScreens/DefaultScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentScreen } from "../nestedScreens/CommentScreen";

const NestedScreens = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerLeft: () => null,
        }}
      />
      <NestedScreens.Screen name="Map" component={MapScreen} />
      <NestedScreens.Screen name="Comments" component={CommentScreen} />
    </NestedScreens.Navigator>
  );
};

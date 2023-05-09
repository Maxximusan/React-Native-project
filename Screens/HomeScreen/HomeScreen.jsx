import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import { CreatePostsScreen } from "../mainScreens/CreatePostsScreen";
import { PostsScreen } from "../mainScreens/PostsScreen";
import { ProfileScreen } from "../mainScreens/ProfileScreen";

const MainTab = createBottomTabNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          // headerShown: false,
          headerTitleAlign: "center",
          headerRight: ({ focused, color, size }) => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          headerTitleAlign: "center",
          headerLeft: ({ focused, color, size }) => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#3b3636"
              style={{ marginLeft: 20 }}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

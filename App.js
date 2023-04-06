import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  // Platform,
  // KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

// import * as Font from "expo-font";
// import { AppLoading } from "expo";

import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  email: "",
  password: "",
};

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
//     "roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
//     "roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// };

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  // const [isReadyForFonts, setIsReadyForFonts] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const [fontsLoaded] = useFonts({
    "roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      // console.log("width", width);
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  // if (!isReadyForFonts) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setIsReadyForFonts(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/screen-2.webp")}
        >
          {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}
          <View
            style={{ ...styles.form, width: dimensions }}
            // style={{ ...styles.form, marginBottom: isShowKeyboard ? 40 : 100 }}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Hello again</Text>
              <Text style={styles.headerTitle}>Welcome</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputTitle}>EMAIL</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                // onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
                // onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
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
    </TouchableWithoutFeedback>
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
    // marginHorizontal: 40,
    marginBottom: 40,
    // backgroundColor: "#fff",
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
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "transparent",
    //     borderColor: "#f0f8ff",
    //   },
    //   android: {
    //     backgroundColor: "#ffb6c1",
    //     borderColor: "transparent",
    //   },
    // }),
    // backgroundColor: Platform.OS === "ios" ? "transparent" : "#ffb6c1",
    // borderColor: Platform.OS === "ios" ? "#f0f8ff" : "transparent",
    backgroundColor: "#ffb6c1",
    borderColor: "transparent",
  },

  btnTitle: {
    // color: Platform.OS === "ios" ? "#4169e1" : `#2e8b57`,
    color: `#2e8b57`,
    fontSize: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 50,
  },

  headerTitle: {
    fontSize: 30,
    color: `#0000ff`,
    fontFamily: "roboto-700",
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

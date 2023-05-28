import { useState, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Button,
} from "react-native";

import { useDispatch } from "react-redux";
import { authLogInUser } from "../../../redux/auth/authOperations";

import { ContextDimensions } from "../../../context/context";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const { dimensions } = useContext(ContextDimensions);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const dispatch = useDispatch();

  const putShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();

    setShowKeyboard(false);
  };

  const submitForm = () => {
    console.log("authLoginSubmit", state);
    setState(initialState);
    dispatch(authLogInUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/Photo-BG.jpg")}
        />
        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={250}
          >
            <View style={{ ...styles.form, width: dimensions }}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Войти</Text>
              </View>

              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={isFocused.email ? styles.inputActive : styles.input}
                  textAlign={"left"}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адресс электронной почты"
                  placeholderTextColor={`#ff0000`}
                  onFocus={() => {
                    setShowKeyboard(true);
                    setIsFocused({ email: true });
                  }}
                  onBlur={() => setIsFocused({})}
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  style={isFocused.password ? styles.inputActive : styles.input}
                  textAlign={"left"}
                  secureTextEntry={showPassword}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Пароль"
                  placeholderTextColor={`#ff0000`}
                  onFocus={() => {
                    setShowKeyboard(true);
                    setIsFocused({ password: true });
                  }}
                  onBlur={() => setIsFocused({})}
                />

                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={putShowPassword}
                >
                  <Text>{showPassword ? "Показать" : "Скрыть"}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.4}
                onPress={submitForm}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.noAkReg}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    width: "100%",
  },

  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    // marginHorizontal: 40,
    // marginBottom: 40,
    // backgroundColor: "#fff",
    // padding: 92 16 78 16
    // paddingHorizontal: 16,
  },

  input: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    paddingLeft: 16,

    borderWidth: 1,
    borderColor: `#90ee90`,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: `#212121`,

    //   outLineColor: "#FF6C00",
    // outLineWidth: 4,
    // outLineStyle: "solid",
  },
  inputActive: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    paddingLeft: 16,

    borderWidth: 1,
    borderColor: `#FF6C00`,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: `#212121`,
  },

  btn: {
    height: 51,
    borderRadius: 100,
    borderWidth: 1,
    // marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderColor: "transparent",
    marginBottom: 16,
  },

  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-400",
  },

  header: {
    alignItems: "center",
    marginBottom: 33,
  },

  headerTitle: {
    fontSize: 30,
    lineHeight: 35,
    color: `#212121`,
    fontFamily: "roboto-500",
  },

  noAkReg: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showPassword: {
    position: "absolute",
    top: 15,
    left: 295,
    // backgroundColor: '#FF6C00',
    // color: "#FFF",
    width: 71,
    height: 19,
    borderRadius: 50,
  },
});

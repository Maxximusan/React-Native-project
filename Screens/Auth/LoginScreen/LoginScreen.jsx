import { useState } from "react";

import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { useDispatch } from "react-redux";

import { authLogInUser } from "../../../redux/auth/authOperations";
import { useOrientationScreen } from "../../../hooks/screenOrientation";
import { useLoaderOnScreenRotation } from "../../../hooks/loader";
import { AuthForm } from "../../../components/AuthForm/AuthForm";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const orientation = useOrientationScreen();
  const loader = useLoaderOnScreenRotation(orientation.isPortrait);
  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const dispatch = useDispatch();

  const keyboardHide = () => {
    //Возможность скрывать клавиатуру при нажатии вне формы
    Keyboard.dismiss();

    setShowKeyboard(false);
  };

  const submitForm = () => {
    // console.log("authLoginSubmit", state);
    setState(initialState);
    dispatch(authLogInUser(state));
  };

  return (
    <>
      {loader ? (
        <ActivityIndicator size="large" color="#00ff00" animating={loader} />
      ) : (
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
                <AuthForm
                  isLoginScreen={true}
                  orientation={orientation}
                  navigation={navigation}
                  setShowKeyboard={setShowKeyboard}
                  state={state}
                  setState={setState}
                  submitForm={submitForm}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
});

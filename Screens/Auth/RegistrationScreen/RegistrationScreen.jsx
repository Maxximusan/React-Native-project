import { useState } from "react";

import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import { authRegistrationUser } from "../../../redux/auth/authOperations";
import { UserAvatar } from "../../../components/AvatarBox/UserAvatar";
import { pickImageAsync } from "../../../helpers/imagePicker";
import { useOrientationScreen } from "../../../hooks/screenOrientation";
import { useLoaderOnScreenRotation } from "../../../hooks/loader";
import { AuthForm } from "../../../components/AuthForm/AuthForm";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: null,
};

export const RegistrationScreen = ({ navigation }) => {
  const orientation = useOrientationScreen();
  const loader = useLoaderOnScreenRotation(orientation.isPortrait);
  const [state, setState] = useState(initialState);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const getAvatarFoto = async () => {
    const result = await pickImageAsync();
    setState((prevState) => ({ ...prevState, avatar: result }));
  };

  const deleteFoto = () => {
    setState((prevState) => ({ ...prevState, avatar: null }));
  };

  const keyboardHide = () => {
    //Возможность скрывать клавиатуру при нажатии вне формы
    Keyboard.dismiss();

    setShowKeyboard(false);
  };

  const submitForm = () => {
    // console.log("authRegisterUser", state);
    setState(initialState);
    dispatch(authRegistrationUser(state));
  };
  return (
    <>
      {loader ? (
        <ActivityIndicator size="large" color="#00ff00" animating={loader} />
      ) : (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.image}
              source={require("../../../assets/images/Photo-BG.jpg")}
            >
              <View style={styles.formContainer}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  keyboardVerticalOffset={80}
                >
                  <UserAvatar
                    getAvatarPhoto={getAvatarFoto}
                    avatar={state.avatar}
                    deleteAvatarPhoto={deleteFoto}
                  />
                  <AuthForm
                    isLoginScreen={false}
                    orientation={orientation}
                    navigation={navigation}
                    setShowKeyboard={setShowKeyboard}
                    state={state}
                    setState={setState}
                    submitForm={submitForm}
                  />
                </KeyboardAvoidingView>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 812,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 14,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ContextDimensions } from "../../context/context";

export const AuthForm = (props) => {
  const {
    isLoginScreen,
    orientation,
    navigation,
    setShowKeyboard,
    state,
    setState,
    submitForm,
  } = props;

  //Альтернатива outlineColor
  const [isFocused, setIsFocused] = useState({});

  const [showPassword, setShowPassword] = useState(true);
  const { dimensions } = useContext(ContextDimensions);

  const putShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  console.log(state);
  return (
    <View style={{ width: dimensions }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isLoginScreen ? "Войти" : "Регистрация"}
        </Text>
      </View>

      {!isLoginScreen ? (
        <View style={{ marginBottom: 16 }}>
          <TextInput
            style={isFocused.login ? styles.inputActive : styles.input}
            textAlign={"left"}
            value={state.login}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                login: value,
              }))
            }
            placeholder="Логин"
            placeholderTextColor={`#ff0000`}
            onFocus={() => {
              setShowKeyboard(true);
              setIsFocused({ login: true });
            }}
            onBlur={() => setIsFocused({})}
          />
        </View>
      ) : null}

      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={isFocused.email ? styles.inputActive : styles.input}
          textAlign={"left"}
          value={state.email}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              email: value,
            }))
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
          style={
            orientation.isPortrait
              ? styles.showPasswordOrientation
              : styles.showPassword
          }
          onPress={putShowPassword}
        >
          <Text> {showPassword ? "Показать" : "Скрыть"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.4}
        onPress={submitForm}
      >
        <Text style={styles.btnTitle}>
          {isLoginScreen ? "Войти" : "Зарегистрироваться"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => {
          isLoginScreen
            ? navigation.navigate("Register")
            : navigation.navigate("Login");
        }}
      >
        {isLoginScreen ? (
          <Text style={styles.regOrLog}>Нет аккаунта? Зарегистрироваться</Text>
        ) : (
          <Text style={styles.regOrLog}>Уже есть аккаунт? Войти</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

  regOrLog: {
    fontFamily: "roboto-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showPassword: {
    position: "absolute",
    top: 15,
    left: 280,
    // backgroundColor: '#FF6C00',
    // color: "#FFF",
    width: 71,
    height: 19,
    borderRadius: 50,
  },
  showPasswordOrientation: {
    position: "absolute",
    top: 15,
    left: 610,
    // backgroundColor: '#FF6C00',
    // color: "#FFF",
    width: 71,
    height: 19,
    borderRadius: 50,
  },
});

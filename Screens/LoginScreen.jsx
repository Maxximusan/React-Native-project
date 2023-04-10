import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
//   Dimensions,
} from "react-native";


const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = (props) => {
    const {dimensions} = props
    const [state, setstate] = useState(initialState);
    const [showPassword, setShowPassword] = useState(true)


    const putShowPassword = () => {
        setShowPassword(prev => !prev)
        
    }


    const keyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

    return (
     <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} >
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/Photo-BG.jpg")}
          >
            
            <View style={styles.formContainer}>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={250}>
                 <View style={{ ...styles.form, width: dimensions }}>
                   <View style={styles.header}>
                      <Text style={styles.headerTitle}>Войти</Text>
                   </View>

                    <View style={{ marginBottom: 16 }}>
              
                       <TextInput
                       style={styles.input}
                        textAlign={"left"}
                         value={state.email}
                           onChangeText={(value) =>
                          setstate((prevState) => ({ ...prevState, email: value }))
                          }
                          placeholder="Адресс электронной почты"
                          placeholderTextColor={`#ff0000`}
                         />
                    </View>
                  <View style={{ marginBottom: 43 }}>
              
              <TextInput
                style={styles.input}
                textAlign={"left"}
                secureTextEntry={showPassword}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="Пароль"
                placeholderTextColor={`#ff0000`}
                    />
                    
                    <TouchableOpacity style={ styles.showPassword} onPress={putShowPassword}>
                         <Text>Показать</Text>               
                </TouchableOpacity>
                   </View>
             <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.4}
              onPress={keyboardHide}
            >
              <Text style={styles.btnTitle}>Войти</Text>
            </TouchableOpacity>
                 <View style={{alignItems: 'center'}}>
                    <Text style={styles.noAkReg}>Нет аккаунта? Зарегистрироваться</Text>  
                 </View>                      
              </View>
              </KeyboardAvoidingView>  
             </View>
           
        </ImageBackground>
        
      </View>
    </TouchableWithoutFeedback>

    
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
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
    borderWidth: 1,
    borderColor: `#90ee90`,
    // margin: 20,
    height: 50,
    borderRadius: 6,
    color: `#212121`,
    // outlineColor: "#FF6C00",
    paddingLeft: 16,
  },

  inputTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: `#ff4500`,
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
    marginBottom:16,
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
      color: '#1B4371',
      
  },
    showPassword: {
        position: 'absolute',
        top: 15,
        left: 300,
        // backgroundColor: '#FF6C00',
        // color: "#FFF",
        width: 71,
        height: 19,
         borderRadius: 50,
    },
});
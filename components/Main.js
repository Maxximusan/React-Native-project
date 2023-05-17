import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

// import { auth } from "../firebase/config";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  //   const [checkUser, setCheckUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);
  //   console.log(state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  //   onAuthStateChanged(auth, (user) => {
  //     setCheckUser(user);
  //     console.log("checkUser", user);
  //   });

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

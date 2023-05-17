import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

import { auth } from "../firebase/config";
import { useRoute } from "../router";

export const Main = () => {
  const [checkUser, setCheckUser] = useState(null);
  const state = useSelector((state) => state);
  console.log(state);

  onAuthStateChanged(auth, (user) => {
    setCheckUser(user);
    console.log("checkUser", user);
  });

  const routing = useRoute(checkUser);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";


import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
 
  const { stateChange } = useSelector((state) => state.auth);
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
 

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

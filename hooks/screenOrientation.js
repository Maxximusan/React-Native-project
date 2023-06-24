import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useOrientationScreen = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const onChange = (result) => {
      setScreenInfo(result.screen);
    };

    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsHandler?.remove();
    };
  }, []);

  return {
    ...screenInfo,
    isPortrait: screenInfo.width > screenInfo.height,
  };
};

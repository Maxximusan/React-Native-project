import { useState, useEffect } from "react";

export const useLoaderOnScreenRotation = (orientation) => {
  const [spinner, setSpinner] = useState(false);
  let timerId = null;
  useEffect(() => {
    if (orientation) {
      setSpinner(true);
      timerId = setTimeout(() => {
        setSpinner(false);
        // console.log("its width");
      }, 1000);

     
    } else {
      setSpinner(true);
      timerId = setTimeout(() => {
        setSpinner(false);
        // console.log("its height");
      }, 1000);

      
    }
    return () => clearTimeout(timerId);
  }, [orientation]);

  return spinner;
};

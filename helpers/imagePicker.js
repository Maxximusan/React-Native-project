// ...rest of the import statements remain unchanged
import * as ImagePicker from "expo-image-picker";

export const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });
  //   console.log(result);

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    alert("You did not select any image.");
  }
};

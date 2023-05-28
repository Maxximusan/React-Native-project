import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const UserAvatar = (props) => {
  const { getUserPhoto, avatar } = props;
  return (
    <View style={styles.userAvatarContainer}>
      {avatar && <Image style={styles.userAvatar} source={{ uri: avatar }} />}
      <TouchableOpacity style={styles.addAvatar} onPress={() => getUserPhoto()}>
        <AntDesign
          //   style={styles.addAvatarIcon}
          name="pluscircleo"
          size={24}
          color={"#FF6C00"}
        />
      </TouchableOpacity>
    </View>
  );
};

{
  /* <View style={styles.userAvatarContainer}></View>
                <TouchableOpacity style={styles.addFoto}>
                  <Image source={require("../../../assets/images/Union.jpg")} />
                </TouchableOpacity> */
}

const styles = StyleSheet.create({
  userAvatarContainer: {
    position: "absolute",
    top: -150,
    alignSelf: "center",
    // left: 130,
    width: 120,
    height: 120,
    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },
  addAvatar: {
    //   position: "absolute",
    //   top: -75,
    //   left: 235,
    //   width: 25,
    //   height: 25,
    //   // backgroundColor: '#FF6C00',
    //   borderRadius: 16,
    //   borderColor: "#FF6C00",
    //   borderWidth: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
    position: "absolute",
    top: 75,
    left: 107,
    width: 25,
    height: 25,
    borderRadius: 16,
    // backgroundColor: "#F6F6F6",
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  //   addAvatarIcon: {
  //     // position: "absolute",
  //     //     top: -45,
  //     // left: 107,
  //   },
});

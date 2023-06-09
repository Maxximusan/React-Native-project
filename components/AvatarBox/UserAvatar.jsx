import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const UserAvatar = (props) => {
  const { getAvatarPhoto, avatar, deleteAvatarPhoto } = props;
  return (
    <>
      {avatar ? (
        <View style={styles.userAvatarContainer}>
          <Image style={styles.userAvatar} source={{ uri: avatar }} />
          <TouchableOpacity
            style={styles.addAvatar}
            onPress={() => deleteAvatarPhoto()}
          >
            <AntDesign
              style={styles.iconDel}
              name="pluscircleo"
              size={24}
              color={"#7e7673"}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userAvatarContainer}>
          <Image style={styles.userAvatar} source={null} />
          <TouchableOpacity
            style={styles.addAvatar}
            onPress={() => getAvatarPhoto()}
          >
            <AntDesign name="pluscircleo" size={24} color={"#FF6C00"} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

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
    position: "absolute",
    top: 75,
    left: 107,
    width: 25,
    height: 25,
    borderRadius: 36,
    // backgroundColor: "#F6F6F6",
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  iconDel: {
    transform: [{ rotate: "45deg" }],
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
  },
});

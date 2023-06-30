import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, AntDesign, Octicons } from "@expo/vector-icons";
import { addLike } from "../../helpers/likeHandler";

export const PostsList = (props) => {
  const {
    isProfileScreen,
    updatedPostArray,
    userId,
    navigation,
    posts,
    orientation,
    deletePost,
  } = props;

  return (
    <FlatList
      data={updatedPostArray}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          {!isProfileScreen ? (
            <View style={styles.userInfoContainer}>
              <Image
                style={styles.userPhoto}
                source={{ uri: item.userPhoto }}
              />
              <View style={styles.userInfo}>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.userEmail}>{item.userEmail}</Text>
              </View>
            </View>
          ) : null}

          <View
            style={
              !isProfileScreen && orientation
                ? {
                    marginBottom: 10,
                    // justifyContent: "center",
                    alignItems: "center",
                  }
                : { marginBottom: 10 }
            }
          >
            {isProfileScreen ? (
              <Image
                source={{ uri: item.photo }}
                style={
                  orientation
                    ? { width: 600, height: 260 }
                    : { width: 360, height: 240 }
                }
              />
            ) : (
              <Image
                source={{ uri: item.photo }}
                style={
                  orientation
                    ? { width: 300, height: 160 }
                    : { width: 380, height: 240 }
                }
              />
            )}
          </View>
          <View
            style={
              !isProfileScreen && orientation
                ? { marginBottom: 10, alignItems: "center" }
                : { marginBottom: 10 }
            }
          >
            <Text style={styles.postTitle}>{item.comment}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    photo: item.photo,
                  })
                }
              >
                <FontAwesome
                  name="comment"
                  size={24}
                  color={item.commentsAmount === 0 ? "#BDBDBD" : "#FF6C00"}
                />
                <Text style={styles.commentsAmount}>{item.commentsAmount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addLike(posts, item.id, userId)}
                style={{ flexDirection: "row", marginLeft: 25 }}
              >
                <AntDesign
                  name="like2"
                  size={18}
                  color={!item.isLiked ? "#BDBDBD" : "#FF6C00"}
                />
                <Text style={{ color: "#212121", marginLeft: 5 }}>
                  {item.likesNumber}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {
                navigation.navigate("Map", { location: item.location });
              }}
            >
              <Octicons name="location" size={20} color="#BDBDBD" />
              <Text style={styles.locationItemText}>{item.terrain}</Text>
            </TouchableOpacity>
            {isProfileScreen && (
              <TouchableOpacity onPress={() => deletePost(item.id)}>
                <AntDesign name="delete" size={24} color="#5e3974" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  post: {
    marginHorizontal: 16,
    marginBottom: 35,
  },
  userInfoContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userInfo: {
    justifyContent: "center",
  },
  userPhoto: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  nickName: {
    fontFamily: "roboto-700",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postTitle: {
    fontFamily: "roboto-700",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignContent: "space-between",
    alignItems: "center",
  },

  commentsAmount: {
    color: "#212121",
    marginLeft: 5,
    fontSize: 18,
  },
  locationItemText: {
    marginLeft: 5,
    fontFamily: "roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

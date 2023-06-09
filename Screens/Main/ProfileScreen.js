import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import LogOut from "../../Components/LogOut";

export default function ProfileScreen() {
  const { userID, nickname, photoURL } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.main);
  const myPosts = posts.filter((item) => item.userID === userID);
  // console.log(`ALL POSTS`, posts);
  // console.log(`MINE`, myPosts);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("../../assets/PhotoBG.jpg")}
        style={styles.background}
      >
        <View style={styles.topform}>
          <View style={styles.uploadwrapper}>
            <Image style={styles.upload} source={{ uri: photoURL }} />
          </View>
          <View style={styles.titlewrapper}>
            <Text style={styles.title}>{nickname}</Text>
          </View>
          <View style={styles.logout}>
            <LogOut />
          </View>

          <FlatList
            style={{ marginTop: 15, width: "100%" }}
            data={myPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: "100%", marginTop: 25 }}>
                <View style={{ width: "100%" }}>
                  <Image
                    source={{ uri: item.photoURL }}
                    style={{
                      width: "100%",
                      height: 240,
                      backgroundColor: "#E8E8E8",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    marginTop: 11,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      gap: 27,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        gap: 9,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />
                      <Text>5</Text>
                    </View>
                    <View
                      style={{
                        gap: 9,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                      <Text>12</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Feather
                      style={styles.pin}
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={{ textDecorationLine: "underline" }}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          ></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  topform: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 325,
  },
  uploadwrapper: {
    marginTop: -60,
    marginBottom: 32,
  },
  upload: {
    width: 120,
    height: 120,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addicon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  titlewrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 0,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
});

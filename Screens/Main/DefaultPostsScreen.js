import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { userID, email, nickname, photoURL } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarwrapper}>
          <Image
            source={require("../../assets/PhotoBG.jpg")}
            style={styles.avatar}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: 700, fontSize: 13 }}>{nickname}</Text>
          <Text style={{ fontWeight: 400, fontSize: 11 }}>{email}</Text>
        </View>
      </View>
      <FlatList
        style={{ marginTop: 15, width: "100%" }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: "100%" }}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={{ width: "100%" }}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.infowrapper}>
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentsScreen", {
                        item,
                      })
                    }
                  >
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      lat: item.coords.latitude,
                      lon: item.coords.longitude,
                    })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={{ textDecorationLine: "underline" }}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    columnGap: 8,
  },
  avatarwrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
  infowrapper: {
    width: "100%",
    flex: 1,
    marginTop: 11,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

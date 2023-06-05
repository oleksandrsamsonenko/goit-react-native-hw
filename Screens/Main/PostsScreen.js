import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route]);
  console.log(route.params);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={{ width: "100%", flexDirection: "row", columnGap: 8 }}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#F5F5F5",
            borderRadius: 16,
          }}
        >
          <Image />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: 700, fontSize: 13 }}>LOGIN</Text>
          <Text style={{ fontWeight: 400, fontSize: 11 }}>EMAIL</Text>
        </View>
      </View>
      <FlatList
        style={{ marginTop: 15, width: "100%" }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: "100%" }}>
            <Image
              source={{ uri: item.photo }}
              style={{
                width: "100%",
                height: 240,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            />
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  marginTop: 8,
                  color: "#212121",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                marginTop: 11,
                marginBottom: 20,
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
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text></Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
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
            <Text style={{ textDecorationLine: "underline" }}>
              {item.coords.latitude}
            </Text>
            <Text style={{ textDecorationLine: "underline" }}>
              {item.coords.longitude}
            </Text>
          </View>
        )}
      />
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
});

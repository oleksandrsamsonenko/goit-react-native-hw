import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const { item } = route.params;
  return (
    <View style={{ width: "100%", paddingHorizontal: 16 }}>
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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={{ textDecorationLine: "underline" }}>
            {item.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

import { View, Text, Image } from "react-native";

export default function PostsScreen({}) {
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
    </View>
  );
}

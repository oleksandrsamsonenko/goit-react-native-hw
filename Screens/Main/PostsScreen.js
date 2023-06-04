import { View, Text, Image, Button } from "react-native";

export default function PostsScreen({ navigation }) {
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
          <Text style={{ fontWeight: 700, fontSize: 13 }}>Natali Romanova</Text>
          <Text style={{ fontWeight: 400, fontSize: 11 }}>email@gmail.com</Text>
        </View>
      </View>
    </View>
  );
}

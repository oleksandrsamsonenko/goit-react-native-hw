import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import LogOut from "../../Components/LogOut";

export default function Home({ navigation }) {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          alignItems: "center",
          paddingHorizontal: 60,
        },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: LogOut,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("CreatePostsScreen")}
            >
              <AntDesign name="plus" size={15} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

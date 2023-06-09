import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "./DefaultPostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

export default function PostsScreen() {
  const NestedScreen = createStackNavigator();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{
          title: "На головну",
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Місце зйомки",
        }}
      />
    </NestedScreen.Navigator>
  );
}

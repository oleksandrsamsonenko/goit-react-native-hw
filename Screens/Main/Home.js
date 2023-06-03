import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

export default function Home() {
  const Tabs = createBottomTabNavigator();

  function Settings() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Settings1"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Settings2"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
}

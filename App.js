import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import CreatePostsScreen from "./Screens/Main/CreatePostsScreen";
import Home from "./Screens/Main/Home";

const useRoute = (isAuth, setLoginStatus) => {
  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          children={
            (render = () => (
              <RegistrationScreen setLoginStatus={setLoginStatus} />
            ))
          }
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          // component={LoginScreen}
          children={
            (render = () => <LoginScreen setLoginStatus={setLoginStatus} />)
          }
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="CreatePostsScreen"
        options={{ title: "Створити публікацію" }}
        component={CreatePostsScreen}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};

const initialState = {
  login: "Default Name",
  email: "",
  password: "",
  photo: "",
};

export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const routing = useRoute(loginStatus, setLoginStatus);
  return (
    <NavigationContainer>
      {routing}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

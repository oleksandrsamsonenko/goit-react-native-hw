import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import CreatePostsScreen from "../Screens/Main/CreatePostsScreen";
import Home from "../Screens/Main/Home";
import { authStateChangeUser } from "../redux/auth/authOperations";

const useRoute = (userID) => {
  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();

  if (!userID) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          children={(render = () => <LoginScreen />)}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Register"
          children={(render = () => <RegistrationScreen />)}
          options={{ headerShown: false }}
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

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  //   const userID = useSelector((state) => state.auth.userID);

  //   useEffect(() => {}, [userID]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

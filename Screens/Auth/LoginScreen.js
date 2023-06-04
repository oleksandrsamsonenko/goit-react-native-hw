import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { CustomInput } from "../../Components/CustomInput";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ setLoginStatus }) {
  const [keyboard, setKeyboard] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState(initialState);
  const navigation = useNavigation();

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/PhotoBG.jpg")}
          style={styles.background}
        >
          <KeyboardAvoidingView style={styles.back} behavior="position">
            <View style={styles.topform}>
              <View style={styles.titlewrapper}>
                <Text style={styles.title}>Увійти</Text>
              </View>

              <CustomInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                value={data.email}
                onFocus={() => setKeyboard(true)}
                onChangeText={(value) =>
                  setData((prev) => ({ ...prev, email: value }))
                }
              ></CustomInput>
              <View style={styles.passcontainer}>
                <CustomInput
                  style={styles.password}
                  placeholder="Пароль"
                  value={data.password}
                  onFocus={() => setKeyboard(true)}
                  secureTextEntry={hidden}
                  onChangeText={(value) =>
                    setData((prev) => ({ ...prev, password: value }))
                  }
                ></CustomInput>
                <Pressable
                  style={styles.hidewrapper}
                  onPress={() => setHidden(!hidden)}
                >
                  <Text style={styles.hide}>
                    {hidden ? "Показати" : "Сховати"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.bottomform}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                console.log(data);
                // navigation.navigate("Home");
                setLoginStatus(true);
              }}
            >
              <Text style={styles.btntext}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>
                  Немає аккаунту?{" "}
                  <Text style={styles.underlinelink}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  back: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  topform: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 32,
  },
  bottomform: {
    backgroundColor: "#FFFFFF",
    paddingTop: 23,
    paddingHorizontal: 16,
    paddingBottom: 78,
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
  wrapper: {
    alignItems: "center",
  },
  titlewrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontSize: 16,
  },
  passcontainer: {
    width: "100%",
    position: "relative",
  },
  password: {
    padding: 16,
    fontSize: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#FF6C00",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  btntext: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  hidewrapper: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  hide: {
    color: "#1B4371",
    fontSize: 16,
  },
  underlinelink: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  link: {
    color: "#1B4371",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addicon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
});

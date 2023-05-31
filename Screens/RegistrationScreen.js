import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SvgUri } from "react-native-svg";
import SVG from "../assets/svg/add.svg";

export default function RegistrationScreen() {
  const [keyboard, setKeyboard] = useState(false);
  const [hidden, setHidden] = useState(true);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ImageBackground
        source={require("../assets/PhotoBG.jpg")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "margin"}
          // style={styles.container}
        >
          <View style={{ ...styles.form, marginBottom: keyboard ? -185 : 0 }}>
            <View style={styles.uploadwrapper}>
              <TextInput style={styles.upload}></TextInput>
            </View>
            <View style={styles.titlewrapper}>
              <Text style={styles.title}>Реєстрація</Text>
            </View>
            <View>
              <SvgUri
                width="25"
                height="25"
                source={require("../assets/svg/add.svg")}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              onFocus={() => setKeyboard(true)}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              onFocus={() => setKeyboard(true)}
            ></TextInput>
            <View style={styles.passcontainer}>
              <TextInput
                style={styles.password}
                placeholder="Пароль"
                onFocus={() => setKeyboard(true)}
                secureTextEntry={hidden}
              ></TextInput>
              <Pressable
                style={styles.hidewrapper}
                onPress={() => setHidden(!hidden)}
              >
                <Text style={styles.hide}>
                  {hidden ? "Показати" : "Сховати"}
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btntext}>Зареєструватися</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
              <Text style={styles.link}>Вже є аккаунт? Увійти</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 78,
  },
  uploadwrapper: {
    alignItems: "center",
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
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontSize: 16,
  },
  passcontainer: {
    marginBottom: 43,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    position: "relative",
  },
  password: {
    padding: 16,
    fontSize: 16,
    width: "100%",
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
  link: {
    color: "#1B4371",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

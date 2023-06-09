import { useState } from "react";
import { useDispatch } from "react-redux";
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
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CustomInput } from "../../Components/CustomInput";
import * as ImagePicker from "expo-image-picker";
import { authSignUp } from "../../redux/auth/authOperations";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "../../firebase/config";

const initialState = {
  nickname: "anna",
  email: "anna@gmail.com",
  password: "qwerty",
};

export default function RegistrationScreen() {
  const [keyboard, setKeyboard] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState(initialState);
  const [state, setState] = useState("ok");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage(firebase);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const photo = await fetch(image);
    const blob = await photo.blob();
    const storageRef = ref(storage, "avatars/" + filename);
    try {
      setState(`loading`);
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const URL = await uploadPhotoToServer();
    dispatch(authSignUp(data.email, data.password, data.nickname, URL));
    setState("ok");

    hideKeyboard();
  };

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
              {image ? (
                <View style={styles.uploadwrapper}>
                  <Image style={styles.upload} source={{ uri: image }} />

                  <Pressable
                    onPress={() => setImage(null)}
                    style={styles.addicon}
                  >
                    <AntDesign name="closecircleo" size={25} color="#FF6C00" />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.uploadwrapper}>
                  <View style={styles.upload}>
                    <Pressable onPress={pick} style={styles.addicon}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </Pressable>
                  </View>
                </View>
              )}
              <View style={styles.titlewrapper}>
                <Text style={styles.title}>Реєстрація</Text>
              </View>
              <CustomInput
                style={styles.input}
                placeholder="Логін"
                value={data.nickname}
                name="nickname"
                onFocus={() => setKeyboard(true)}
                onChangeText={(value) =>
                  setData((prev) => ({ ...prev, nickname: value }))
                }
              ></CustomInput>
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
                  onChangeText={(value) =>
                    setData((prev) => ({ ...prev, password: value }))
                  }
                  secureTextEntry={hidden}
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
            {state === "loading" ? (
              <ActivityIndicator size="large" color="#FF6C00" />
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  dispatch(handleSubmit);
                }}
              >
                <Text style={styles.btntext}>Зареєструватися</Text>
              </TouchableOpacity>
            )}
            <View style={styles.wrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Вже є аккаунт? Увійти</Text>
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

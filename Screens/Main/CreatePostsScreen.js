import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

initialData = {
  name: "",
  location: "",
};

export default function CreatePostsScreen() {
  const [keyboard, setKeyboard] = useState(false);
  const [postData, setPostData] = useState(initialData);
  const [image, setImage] = useState(null);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };
  const publish = postData.name && postData.location && image;

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
        <View style={{ flex: 1, width: "100%" }}>
          {!image ? (
            <View style={styles.uploadwrapper}>
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pick}
              >
                <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
              </Pressable>
            </View>
          ) : (
            <View style={styles.uploadwrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#FFFFFF4D",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                }}
                onPress={pick}
              >
                <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          )}
          <View style={{ width: "100%" }}>
            <Text
              style={{
                marginTop: 8,
                color: "#BDBDBD",
              }}
            >
              Завантажте фото
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Назва"
            value={postData.name}
            onFocus={() => setKeyboard(true)}
            onChangeText={(value) =>
              setPostData((prev) => ({ ...prev, name: value }))
            }
          ></TextInput>
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              value={postData.location}
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Місцевість..."
              onFocus={() => setKeyboard(true)}
              onChangeText={(value) =>
                setPostData((prev) => ({ ...prev, location: value }))
              }
            ></TextInput>
            <Feather
              style={styles.pin}
              name="map-pin"
              size={24}
              color="#BDBDBD"
            />
          </View>
          {publish ? (
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "#FF6C00" }}
              onPress={() => console.log(image, postData)}
            >
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btn}>
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>
                Опублікувати
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              setPostData(initialData);
              setImage(null);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 50,
    width: "100%",
    padding: 16,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  uploadwrapper: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
  },
  pin: {
    position: "absolute",
    top: 13,
    left: 4,
  },
  btn: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  delete: {
    width: 70,
    backgroundColor: "#F6F6F6",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

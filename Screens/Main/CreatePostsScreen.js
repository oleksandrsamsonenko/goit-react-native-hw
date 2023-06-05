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
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

initialData = {
  name: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [keyboard, setKeyboard] = useState(false);
  const [postData, setPostData] = useState(initialData);
  const [image, setImage] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };
  const publish = postData.name && postData.location && image && location;
  const ready = postData.name && postData.location && image && !location;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={{ flex: 1, width: "100%" }}>
          {image ? (
            <View style={styles.uploadwrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <Pressable
                style={styles.iconwrapper}
                onPress={() => setImage(null)}
              >
                <MaterialCommunityIcons
                  name="camera-retake-outline"
                  size={24}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.uploadwrapper}>
              <Camera
                style={styles.camera}
                type={type}
                ref={setCameraRef}
              ></Camera>
              <TouchableOpacity
                style={styles.flipwrapper}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconwrapper}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    setImage(uri);
                    // console.log(uri);
                    // console.log(location);
                    await MediaLibrary.createAssetAsync(uri);
                  }
                }}
              >
                <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          )}

          <View style={{ width: "100%" }}>
            <Text
              style={{
                marginTop: 8,
                color: "#BDBDBD",
              }}
            >
              {!image ? "Завантажте фото" : "Редагувати фото"}
            </Text>
          </View>

          {/* {location && (
            <View style={styles.uploadwrapper}>
              <MapView
                style={styles.map}
                region={{
                  ...location,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
              >
                {location && (
                  <Marker
                    title="I am here"
                    coordinate={location}
                    description="Hello"
                  />
                )}
              </MapView>
            </View>
          )} */}

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
              onPress={() => {
                navigation.navigate("Home", {
                  screen: "PostsScreen",
                  params: { ...postData, photo: image, coords: location },
                });

                // console.log(image, postData);
              }}
            >
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btn}>
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>
                {ready ? "Зачекайте, отримую розташування" : "Опублікувати"}
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
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  iconwrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF4D",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  flipwrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF4D",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

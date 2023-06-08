import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOut } from "../redux/auth/authOperations";

export default function LogOut({ color = "#BDBDBD" }) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOut());
  };
  return (
    <TouchableOpacity style={{ marginRight: 16 }} onPress={logOut}>
      <MaterialIcons name="logout" size={24} color={color} />
    </TouchableOpacity>
  );
}

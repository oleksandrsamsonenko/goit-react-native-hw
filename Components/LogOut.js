import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function LogOut({ color = "#BDBDBD" }) {
  return (
    <TouchableOpacity style={{ marginRight: 16 }}>
      <MaterialIcons name="logout" size={24} color={color} />
    </TouchableOpacity>
  );
}

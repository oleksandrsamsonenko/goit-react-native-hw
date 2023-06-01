import { TextInput } from "react-native";
import { useState } from "react";

export const CustomInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[props.style, isFocused && { border: 1, borderColor: "#FF6C00" }]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => {
        setIsFocused(true);
        props.onFocus();
      }}
    />
  );
};

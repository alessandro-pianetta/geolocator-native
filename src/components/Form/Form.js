import React from "react";
import { View } from "react-native";

import styles from "./styles";

import Input from "../global/Input";

const Form = ({ form }) => (
  <View style={styles.container}>
    {form.map(input => (
      <Input
        key={`input-${input.labelText}`}
        labelText={input.labelText}
        onChangeText={input.onChangeText}
        value={input.value}
        placeholder={input.placeholder}
        autoCapitalize={input.autoCapitalize || "none"}
        secureTextEntry={input.secureTextEntry}
      />
    ))}
  </View>
);

export default Form;

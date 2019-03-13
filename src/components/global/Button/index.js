import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';


const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.buttonStyle]}
      onPress={() => props.onPress()}
    >
      <Text style={[styles.text, props.textStyle]}>
        {props.text ? props.text : 'Submit'}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

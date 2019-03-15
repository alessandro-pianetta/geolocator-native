import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

interface Props {
	buttonStyle: ViewStyle;
	onPress(event: any): void;
	text: string;
	textStyle: TextStyle;
}

const Button = (props: Props) => {
	return (
		<TouchableOpacity
			style={[styles.container, props.buttonStyle]}
			onPress={props.onPress}
		>
			<Text style={[styles.text, props.textStyle]}>
				{props.text ? props.text : 'Submit'}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

import React from 'react';
import {
	Dimensions,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import styles from './styles';

interface Style {
	containerStyle: ViewStyle;
	labelStyle: TextStyle;
	inputStyle: TextStyle;
}

interface Props {
	labelText: string;
	value: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	style?: Style;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
}

const Input = ({
	style = { containerStyle: {}, labelStyle: {}, inputStyle: {} },
	labelText,
	onChangeText,
	value,
	autoCorrect,
	autoCapitalize,
	keyboardType,
	multiline,
	numberOfLines,
	placeholder,
	secureTextEntry,
}: Props) => {
	const { containerStyle, labelStyle, inputStyle } = style;
	const { height, width } = Dimensions.get('window');

	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={[styles.label, labelStyle]}>{labelText}</Text>
			<TextInput
				style={[styles.input, inputStyle]}
				onChangeText={text => onChangeText(text)}
				value={value}
				placeholder={placeholder}
				autoCorrect={autoCorrect}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				multiline={multiline}
				numberOfLines={numberOfLines}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
};

export default Input;

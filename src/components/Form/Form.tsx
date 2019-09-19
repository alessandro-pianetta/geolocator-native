import React from 'react';
import { Dimensions, View } from 'react-native';

import { styles } from './styles';

import Input from '../global/Input';

interface Input {
	labelText: string;
	value: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	onValueChange(event: any): void;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
}

interface Props {
	style: any;
	form: Input[];
	validations: any;
}

const Form = ({ style, form }: Props) => {
	return (
		<View style={[styles.inputContainer, style]}>
			{form.map((input: Input, index: number) => (
				<Input
					key={`input-${input.labelText}`}
					index={index}
					containerStyle={[
						index !== form.length - 1 && { marginBottom: 20 },
					]}
					{...input}
				/>
			))}
		</View>
	);
};

export default Form;

import React from 'react';
import { Dimensions, View } from 'react-native';

import styles from './styles';

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

interface Form {
	form: Input[];
	validations: any;
}

const Form = ({ form }: Form) => {
	return (
		<View style={styles.inputContainer}>
			{form.map((input: Input) => (
				<Input key={`input-${input.labelText}`} {...input} />
			))}
		</View>
	);
};

export default Form;

import React from 'react';
import { View } from 'react-native';

import styles from './styles';

import Input from '../global/Input';

interface Input {
	labelText: string;
	value: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	isSegmented?: boolean;
	style: any;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
}

interface Form {
	form: Input[];
	validations: any;
}

const Form = ({ form }: Form) => (
	<View style={styles.container}>
		{form.map((input: Input) => (
			<Input
				key={`input-${input.labelText}`}
				labelText={input.labelText}
				onChangeText={input.onChangeText}
				value={input.value}
				placeholder={input.placeholder}
				autoCapitalize={input.autoCapitalize || 'none'}
				secureTextEntry={input.secureTextEntry}
			/>
		))}
	</View>
);

export default Form;

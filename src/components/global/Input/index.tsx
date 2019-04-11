import React, { PureComponent } from 'react';
import {
	Dimensions,
	Switch,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import styles from './styles';

interface Props {
	labelText: string;
	value: string | boolean;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	onValueChange(event: any): void;
	switch?: boolean;
	containerStyle?: ViewStyle;
	labelStyle?: TextStyle;
	inputStyle?: TextStyle;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
	type?: string;
}

class Input extends PureComponent<Props> {
	render() {
		const { height, width } = Dimensions.get('window');

		if (this.props.type === 'switch') {
			return (
				<View style={styles.switch}>
					<Text style={[{ paddingHorizontal: 5 }, styles.label]}>
						{this.props.labelText}
					</Text>
					<Switch
						onValueChange={this.props.onValueChange}
						value={this.props.value}
					/>
				</View>
			);
		}

		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<Text style={[styles.label, this.props.labelStyle]}>
					{this.props.labelText}
				</Text>
				<TextInput
					style={[styles.input, this.props.inputStyle]}
					onChangeText={text => this.props.onChangeText(text)}
					value={this.props.value}
					placeholder={this.props.placeholder}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					keyboardType={this.props.keyboardType}
					multiline={this.props.multiline}
					numberOfLines={this.props.numberOfLines}
					secureTextEntry={this.props.secureTextEntry}
				/>
			</View>
		);
	}
}

export default Input;

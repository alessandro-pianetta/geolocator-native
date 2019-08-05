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
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';

interface Props {
	labelText: string;
	value: any;
	object: any;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any, secondary?: any): void;
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

		if (this.props.type === 'phone') {
			return (
				<View style={[styles.container, this.props.containerStyle]}>
					<Text style={[styles.label, this.props.labelStyle]}>
						{this.props.labelText}
					</Text>
					<TextInputMask
						style={[styles.input, this.props.inputStyle]}
						type={'custom'}
						options={{
							/**
							 * mask: (String | required | default '')
							 * the mask pattern
							 * 9 - accept digit.
							 * A - accept alpha.
							 * S - accept alphanumeric.
							 * * - accept all, EXCEPT white space.
							 */
							mask: '(999) 999-9999',
						}}
						value={this.props.value}
						onChangeText={text => {
							console.log(text); // +1 (123) 456-78-90
							this.props.onChangeText(text);
						}}
						placeholder={this.props.placeholder}
						mask={'([000]) [000]-[0000]'}
					/>
				</View>
			);
		}

		if (this.props.type === 'address') {
			const {
				street,
				city,
				state,
				postCode,
				country,
			} = this.props.object;

			return (
				<View style={[styles.container, this.props.containerStyle]}>
					<Text style={[styles.label, this.props.labelStyle]}>
						{this.props.labelText}
					</Text>
					<View>
						<TextInput
							style={[styles.input, this.props.inputStyle]}
							onChangeText={text =>
								this.props.onChangeText(text, 'street')
							}
							value={street}
							placeholder={'Street'}
							autoCapitalize={'words'}
						/>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							style={[
								{ flex: 1 },
								styles.input,
								this.props.inputStyle,
							]}
							onChangeText={text =>
								this.props.onChangeText(text, 'city')
							}
							value={city}
							placeholder={'City'}
							autoCapitalize={'words'}
						/>
						<TextInput
							style={[
								{ flex: 1 },
								styles.input,
								this.props.inputStyle,
							]}
							onChangeText={text =>
								this.props.onChangeText(text, 'state')
							}
							value={state}
							placeholder={'state'}
							autoCapitalize={'words'}
						/>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<TextInput
							style={[
								{ flex: 1 },
								styles.input,
								this.props.inputStyle,
							]}
							onChangeText={text =>
								this.props.onChangeText(text, 'postCode')
							}
							value={postCode}
							placeholder={'ZIP Code'}
							autoCapitalize={'words'}
						/>
						<TextInput
							style={[
								{ flex: 1 },
								styles.input,
								this.props.inputStyle,
							]}
							onChangeText={text =>
								this.props.onChangeText(text, 'country')
							}
							value={country}
							placeholder={'Country'}
							autoCorrect={this.props.autoCorrect}
							autoCapitalize={'words'}
							keyboardType={this.props.keyboardType}
							multiline={this.props.multiline}
							numberOfLines={this.props.numberOfLines}
							secureTextEntry={this.props.secureTextEntry}
						/>
					</View>
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

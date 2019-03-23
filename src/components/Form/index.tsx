import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import { Button } from 'prefab-components';
import FormArray from '../../components/Form/Form';
import {
	addCallToHistory,
	convertRadius,
	formatAddress,
} from '../../redux/Location/actions';

import GooglePlaces from '../global/GooglePlaces';

interface Props {
	style: any;
	labelText: string;
	value: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	onChangeText(event: any): void;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
	addCallToHistory(recipient: string, message: string, phone: string): void;
}

interface State {
	address: string;
	init: false;
	message: string;
	phone: string;
	radius: string;
	recipient: string;
	sender: string;
}

class Form extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			address: '',
			init: false,
			message: '',
			phone: '',
			radius: '',
			recipient: '',
			sender: '',
		};
	}

	handleSubmit() {
		// this.props.formatAddress(this.state.address)
		// this.props.convertRadius(this.state.radius, this.state.selectedIndex)
		this.props.addCallToHistory(
			this.state.recipient,
			this.state.message,
			this.state.phone,
		);
	}

	render() {
		const { height, width } = Dimensions.get('window');
		const { phone, radius, message } = this.state;

		const mapForm = [
			{
				keyboardType: 'phone-pad',
				labelText: "Friend's phone number",
				onChangeText: (phone: string) => {
					this.setState({ phone });
				},
				placeholder: '(123) 456-7890',
				value: phone,
			},
			{
				keyboardType: 'numeric',
				labelText: `Distance in ${
					false ? 'km' : 'miles'
				} to send alert`,
				onChangeText: (radius: string) => this.setState({ radius }),
				placeholder: '2',
				value: radius,
			},
			{
				labelText: 'Custom message',
				multiline: true,
				numberOfLines: 4,
				onChangeText: (message: string) => {
					this.setState({ message });
				},
				placeholder: 'Enter custom message here',
				value: message,
			},
		];

		return (
			<View style={styles.container}>
				<GooglePlaces
					onPress={(address: string) => this.setState({ address })}
				/>
				<View style={styles.inputContainer}>
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-around',
							marginBottom: 20,
							width,
						}}
					>
						<FormArray form={mapForm} />
					</View>

					<Button
						onPress={this.handleSubmit}
						danger={true}
						full={true}
						text='Submit'
					/>
				</View>
			</View>
		);
	}
}

export default connect(
	null,
	{ formatAddress, convertRadius, addCallToHistory },
)(Form);

import React, { PureComponent } from 'react';
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
import Border from '../global/Border';

import GooglePlaces from '../GooglePlaces';

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
	navigation?: any;
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

class Form extends PureComponent<Props, State> {
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

	componentWillReceiveProps(nextProps: Props) {
		const {
			givenName,
			mobile,
			radius,
			message,
			address,
		} = nextProps.navigation.state.params;

		const addressStr =
			address.street ||
			address.city ||
			address.state ||
			address.postCode ||
			address.country
				? `${address.street} ${address.city} ${address.state} ${
						address.postCode
				  } ${address.country}`
				: '';

		this.setState({
			recipient: givenName,
			address: addressStr,
			phone: mobile,
			radius,
			message,
		});
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
		const { recipient, phone, radius, message, address } = this.state;

		const mapForm = [
			{
				labelText: 'Name',
				onChangeText: (recipient: string) => {
					this.setState({ recipient });
				},
				placeholder: 'Alex',
				value: recipient,
			},

			{
				keyboardType: 'phone-pad',
				labelText: 'Phone number',
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
					address={address}
					onPress={(address: string) => this.setState({ address })}
				/>
				<Border />
				<FormArray form={mapForm} />
				<Button
					onPress={this.handleSubmit}
					danger={true}
					full={true}
					text='Submit'
				/>
			</View>
		);
	}
}

export default connect(
	null,
	{ formatAddress, convertRadius, addCallToHistory },
)(Form);

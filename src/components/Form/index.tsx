import React, { PureComponent } from 'react';
import { Alert, Animated, Dimensions, View } from 'react-native';
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
	isMapOpen: boolean;
	margin: any;
	formHeight: any;
	formOpacity: any;
	animate(event: boolean): void;
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
		if (!nextProps) {
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
	}

	closeMap = () => {
		console.log('map closing');
		this.props.animate(false);
	}

	openMap = () => {
		this.props.animate(true);
		this.props.formatAddress(this.state.address);
		this.props.convertRadius(this.state.radius, this.state.selectedIndex);
		this.props.addCallToHistory(
			this.state.recipient,
			this.state.message,
			this.state.phone,
		);
	}

	handleSubmit = () => {
		if (this.props.isMapOpen) {
			Alert.alert('Cancel', 'Do you really want to cancel?', [
				{
					text: 'Yes, please',
					onPress: () => {
						console.log('close map');
						this.closeMap();
					},
				},
				{
					text: 'Never mind',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			]);
		} else {
			this.openMap();
		}
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
				labelText: 'Phone Number',
				onChangeText: (phone: string) => {
					this.setState({ phone });
				},
				type: 'phone',
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
			<Animated.View
				style={[
					styles.container,
					{
						paddingTop: this.props.margin,
					},
				]}
			>
				<GooglePlaces
					editable={!this.props.isMapOpen}
					address={address}
					onPress={(address: string) => this.setState({ address })}
				/>
				<Border style={{ marginTop: 50 }} />
				<Animated.View
					style={[
						{
							flex: this.props.formHeight,
							opacity: this.props.formOpacity,
						},
					]}
				>
					{this.props.isMapOpen ? null : <FormArray form={mapForm} />}
				</Animated.View>
				<Button
					disabled={
						!this.state.address.length ||
						!this.state.phone.length ||
						!this.state.radius.length ||
						!this.state.recipient.length
					}
					grayedOut={
						!this.state.address.length ||
						!this.state.phone.length ||
						!this.state.radius.length ||
						!this.state.recipient.length
					}
					onPress={this.handleSubmit}
					danger={this.props.isMapOpen ? true : false}
					success={this.props.isMapOpen ? false : true}
					full={true}
					text={!this.props.isMapOpen ? 'Submit' : 'Cancel'}
				/>
			</Animated.View>
		);
	}
}

export default connect(
	null,
	{ formatAddress, convertRadius, addCallToHistory },
)(Form);

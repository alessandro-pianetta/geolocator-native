import React, { PureComponent } from 'react';
import { Alert, Animated, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import { Button } from 'prefab-components';
import FormArray from '../../components/Form/Form';
import { setFormInfo } from '../../redux/Form/actions';
import {
	addCallToHistory,
	convertRadius,
	formatAddress,
	resetApp,
} from '../../redux/Location/actions';

import BannerAdvert from '../global/Banner';
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
	invalidRadius: boolean;
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
		Alert.alert('Do you really want to cancel?', '', [
			{
				text: 'OK',
				onPress: () => this.props.resetApp(),
			},
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
		]);
		this.props.setFormInfo('', '', '');
	}

	openMap = () => {
		const { recipient, phone, message, address, radius } = this.state;
		this.props.animate(true);
		this.props.setFormInfo(recipient, message, phone);
		this.props.formatAddress(address);
		this.props.convertRadius(radius, this.props.usesMetric);
	}

	handleSubmit = () => {
		if (this.props.isMapOpen) {
			this.closeMap();
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
				placeholder: '',
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
					this.props.usesMetric ? 'kilometers' : 'miles'
				} to send alert`,
				onChangeText: (radius: string) => {
					const maxRadius = this.props.usesMetric ? 50 : 30;
					this.setState({ radius });
					if (parseFloat(radius) > maxRadius) {
						this.setState({ invalidRadius: true });
					} else {
						if (this.state.invalidRadius) {
							this.setState({
								invalidRadius: false,
							});
						}
					}
				},
				placeholder: `Maximum radius is ${
					this.props.usesMetric ? '50 km' : '30 mi'
				}`,
				type: 'radius',
				usesMetric: this.props.usesMetric,
				value: radius,
				invalidRadius: this.state.invalidRadius,
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
				{/* <BannerAdvert unitID='ca-app-pub-8155390171832078/6937225125' /> */}
				<Button
					disabled={
						!this.state.address.length ||
						!this.state.phone.length ||
						!this.state.radius.length ||
						!this.state.recipient.length ||
						this.state.invalidRadius
					}
					grayedOut={
						!this.state.address.length ||
						!this.state.phone.length ||
						!this.state.radius.length ||
						!this.state.recipient.length ||
						this.state.invalidRadius
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

const mapStateToProps = ({ user }) => ({
	usesMetric: user.usesMetric,
});

export default connect(
	mapStateToProps,
	{ formatAddress, convertRadius, addCallToHistory, resetApp, setFormInfo },
)(Form);

import React, { PureComponent } from 'react';
import { Alert, Dimensions, SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { MAPS_API_KEY } from '../../consts/api';

import { GooglePlacesStyles, styles } from './styles';

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
		if (nextProps.navigation.state.params) {
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

		if (this.props.eta || nextProps.eta) {
			console.log('onComplete', this.props, nextProps);
			// 	this.props.onComplete(() => {
			// 		this.resetForm();
			// 	});
		}
	}

	resetForm = () => {
		this.setState({
			address: '',
			init: false,
			message: '',
			phone: '',
			radius: '',
			recipient: '',
			sender: '',
		});
	}

	openMap = () => {
		const { recipient, phone, message, address, radius } = this.state;
		this.props.setFormInfo(recipient, message, phone);
		this.props.formatAddress(address);
		this.props.convertRadius(radius, this.props.usesMetric);
		this.props.openMap();
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
				labelText: 'Additional message',
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
			<View style={[styles.container]}>
				<GooglePlacesAutocomplete
					editable={!this.props.isMapOpen}
					placeholder='Search'
					minLength={2}
					autoFocus={false}
					returnKeyType={'search'}
					listViewDisplayed='true'
					renderDescription={(row: any) => row.description}
					onPress={(data: any) =>
						this.setState({ address: data.description })
					}
					getDefaultValue={() => ''}
					query={{
						key: MAPS_API_KEY,
						language: 'en',
					}}
					text={address}
					styles={GooglePlacesStyles}
					nearbyPlacesAPI='GooglePlacesSearch'
					GoogleReverseGeocodingQuery={{}}
					GooglePlacesSearchQuery={{
						rankby: 'distance',
					}}
					filterReverseGeocodingByTypes={[
						'locality',
						'administrative_area_level_3',
					]}
				/>

				<FormArray
					style={{ marginTop: 44, paddingTop: 20 }}
					form={mapForm}
				/>
				{/* <BannerAdvert unitID='ca-app-pub-8155390171832078/6937225125' /> */}
				<View>
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
						onPress={this.openMap}
						success={true}
						full={true}
						text='Submit'
					/>
					<Button
						primary={true}
						onPress={() => {
							this.resetForm();
						}}
						full={true}
						text={'Clear'}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ location, user }) => ({
	eta: location.eta,
	usesMetric: user.usesMetric,
});

export default connect(
	mapStateToProps,
	{ formatAddress, convertRadius, addCallToHistory, resetApp, setFormInfo },
)(Form);

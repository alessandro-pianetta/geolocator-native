import React, { PureComponent } from 'react';
import { Alert, Modal, Platform, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
// Components
import Form from '../../components/Form';
import Map from '../../components/Map';
import { watchLocation } from '../../utils/locationUtils';
import * as permissions from '../../utils/permissionUtils';

// Redux
import { setFormInfo } from '../../redux/Form/actions';
import { getLocation, resetApp } from '../../redux/Location/actions';

import { getUser } from '../../redux/User/actions';

// Styles
import styles from './styles';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

interface FormInfo {
	firstName: string;
	phoneNumber: string;
	message: string;
}

interface Props {
	navigation: any;
	initialLocation: Location;
	currentLocation: Location;
	destination: Location;
	radius: string;
	form: FormInfo;
	getLocation(): void;
	watchLocation(destination: Location, radius: string): void;
	getUser(): void;
}

interface State {
	isMapOpen: boolean;
}

class MapPage extends PureComponent<Props, State> {
	state = {
		isMapOpen: false,
	};

	id: any;

	async componentWillMount() {
		const { OS } = Platform;
		if (OS === 'ios') {
			await permissions.requestiOSContactPermissions();
		} else {
			await permissions.requestAndroidViewContactPermissions();
			await permissions.requestAndroidWriteContactPermissions();
		}
		this.props.getUser();
		this.props.getLocation();
	}
	componentDidUpdate(prevProps: Props) {
		const {
			destination,
			radius,
			form: { firstName, phoneNumber, message },
		} = this.props;

		if (destination !== prevProps.destination) {
			if (!destination) {
				navigator.geolocation.clearWatch(this.id);
				this.closeMap();
			} else {
				this.id = watchLocation(
					firstName,
					phoneNumber,
					message,
					destination,
					radius,
				);
			}
		}
	}

	onComplete = (func = () => console.log('No Function')) => {
		func();
	}

	openMap = () => {
		this.setState({
			isMapOpen: true,
		});
	}
	closeMap = () => {
		this.setState({
			isMapOpen: false,
		});
	}

	cancelMap = () => {
		Alert.alert('Do you really want to cancel?', '', [
			{
				text: 'OK',
				onPress: () => {
					this.props.resetApp();
					this.props.setFormInfo();
				},
			},
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
		]);
	}

	render() {
		const {
			initialLocation,
			currentLocation,
			destination,
			radius,
			navigation,
		} = this.props;

		const { isMapOpen } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<Modal
					animationType='slide'
					transparent={true}
					visible={this.state.isMapOpen}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<Map
						cancelMap={this.cancelMap}
						initialLocation={initialLocation}
						currentLocation={currentLocation}
						destination={destination}
						radius={radius}
					/>
				</Modal>
				<Form
					onComplete={this.onComplete}
					isMapOpen={isMapOpen}
					openMap={this.openMap}
					navigation={navigation}
				/>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = ({ location, form }) => ({
	currentLocation: location.currentLocation,
	destination: location.destination,
	initialLocation: location.initialLocation,
	radius: location.radius,
	form,
});

export default connect(
	mapStateToProps,
	{ getLocation, watchLocation, getUser, resetApp, setFormInfo },
)(MapPage);

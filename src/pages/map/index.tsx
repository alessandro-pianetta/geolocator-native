import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';
// Components
import Form from '../../components/Form';
import Map from '../../components/Map';
import * as permissions from '../../utils/permissionUtils';

// Redux
import { getLocation, watchLocation } from '../../redux/Location/actions';
// Styles
import styles from './styles';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

interface Props {
	initialLocation: Location;
	currentLocation: Location;
	destination: Location;
	radius: string;
	getLocation(): void;
	watchLocation(destination: Location, radius: string): void;
}

class MapPage extends PureComponent<Props> {
	async componentWillMount() {
		const { OS } = Platform;
		if (OS === 'ios') {
			await permissions.requestiOSContactPermissions();
		} else {
			await permissions.requestAndroidViewContactPermissions();
			await permissions.requestAndroidWriteContactPermissions();
		}
		this.props.getLocation();
	}

	componentDidUpdate(prevProps: Props) {
		const { destination, radius, watchLocation } = this.props;

		if (destination !== prevProps.destination) {
			watchLocation(destination, radius);
		}
	}

	render() {
		const {
			initialLocation,
			currentLocation,
			destination,
			radius,
		} = this.props;

		return (
			<View style={styles.container}>
				<Map
					initialLocation={initialLocation}
					currentLocation={currentLocation}
					destination={destination}
					radius={radius}
				/>
				<Form navigation={this.props.navigation} />
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({
	currentLocation: state.currentLocation,
	destination: state.destination,
	initialLocation: state.initialLocation,
	radius: state.radius,
});

export default connect(
	mapStateToProps,
	{ getLocation, watchLocation },
)(MapPage);

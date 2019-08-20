import React, { PureComponent } from 'react';
import { Animated, Platform, View } from 'react-native';
import { connect } from 'react-redux';
// Components
import Form from '../../components/Form';
import Map from '../../components/Map';
import { watchLocation } from '../../utils/locationUtils';
import * as permissions from '../../utils/permissionUtils';

// Redux
import { getLocation } from '../../redux/Location/actions';
// Styles
import styles from './styles';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

interface Props {
	navigation: any;
	initialLocation: Location;
	currentLocation: Location;
	destination: Location;
	radius: string;
	getLocation(): void;
	watchLocation(destination: Location, radius: string): void;
}

interface State {
	mapHeight: any;
	outerFormHeight: any;
	innerFormHeight: any;
	formMargin: any;
	formOpacity: any;
	isMapOpen: boolean;
}

class MapPage extends PureComponent<Props, State> {
	state = {
		mapHeight: new Animated.Value(0),
		outerFormHeight: new Animated.Value(1),
		innerFormHeight: new Animated.Value(1),
		formMargin: new Animated.Value(36),
		formOpacity: new Animated.Value(1),
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
		this.props.getLocation();
	}

	animate = (isMapOpen: boolean) => {
		const {
			mapHeight,
			outerFormHeight,
			innerFormHeight,
			formOpacity,
			formMargin,
		} = this.state;
		console.log('animate map');
		Animated.parallel([
			Animated.timing(mapHeight, {
				toValue: isMapOpen ? 6 : 0,
				duration: 1000,
			}),
			Animated.timing(outerFormHeight, {
				toValue: isMapOpen ? 1 : 5,
				duration: 1000,
			}),
			Animated.timing(innerFormHeight, {
				toValue: isMapOpen ? 0 : 100,
				duration: 1000,
			}),
			Animated.timing(formOpacity, {
				toValue: isMapOpen ? 0 : 1,
				duration: 1000,
			}),
			Animated.timing(formMargin, {
				toValue: isMapOpen ? 0 : 36,
				duration: 1000,
			}),
		]).start();

		this.setState({ isMapOpen });
	}

	componentDidUpdate(prevProps: Props) {
		const { destination, radius } = this.props;

		if (destination !== prevProps.destination) {
			this.animate(destination ? true : false);
			if (!destination) {
				navigator.geolocation.clearWatch(this.id);
			} else {
				this.id = watchLocation(destination, radius);
			}
		}
	}

	render() {
		const {
			initialLocation,
			currentLocation,
			destination,
			radius,
			navigation,
		} = this.props;

		const {
			isMapOpen,
			innerFormHeight,
			formMargin,
			mapHeight,
			outerFormHeight,
		} = this.state;

		return (
			<View style={styles.container}>
				<Animated.View style={{ flex: mapHeight }}>
					<Map
						initialLocation={initialLocation}
						currentLocation={currentLocation}
						destination={destination}
						radius={radius}
					/>
				</Animated.View>
				<Animated.View style={{ flex: outerFormHeight }}>
					<Form
						isMapOpen={isMapOpen}
						animate={this.animate}
						navigation={navigation}
						formHeight={innerFormHeight}
						margin={formMargin}
					/>
				</Animated.View>
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({
	currentLocation: state.location.currentLocation,
	destination: state.location.destination,
	initialLocation: state.location.initialLocation,
	radius: state.location.radius,
});

export default connect(
	mapStateToProps,
	{ getLocation, watchLocation },
)(MapPage);

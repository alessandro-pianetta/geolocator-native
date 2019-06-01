import { any } from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Animated, AnimatedRegion } from 'react-native-maps';
import { normalizeName } from '../../utils/textUtils';
import styles from './styles';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

interface Props {
	initialLocation: any;
	currentLocation: Location;
	destination: Location;
	radius: string;
}

interface State {
	destination: boolean;
}

class Map extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			destination: false,
		};
	}

	map: any;
	[markerName: string]: any;

	componentDidUpdate(prevProps: Props) {
		const { initialLocation, currentLocation, destination } = this.props;

		if (currentLocation && destination) {
			const midRegion = this.formatRegion({
				latitude: (currentLocation.latitude + destination.latitude) / 2,
				longitude:
					(currentLocation.longitude + destination.longitude) / 2,
			});

			if (destination && !this.state.destination) {
				this.setState({ destination: true });
				const destinationRegion = this.formatRegion(destination);
				this.map.animateToRegion(destinationRegion);
			} else {
				this.map.fitToElements(true);
				this.map.animateToRegion(midRegion);
			}
		}
	}

	renderMarker(location: Location, markerName: string): MapView {
		if (!location) {
			return;
		}

		const blue = require('../../../assets/images/currentLocation.png');

		return (
			<MapView.Marker
				ref={(marker: any) => (this[markerName] = marker)}
				coordinate={location}
				image={markerName === 'currentLocation' ? blue : ''}
				title={normalizeName(markerName)}
			/>
		);
	}

	renderTarget(): MapView {
		if (!this.props.destination) {
			return;
		}

		const { longitude, latitude } = this.props.destination;
		return (
			<MapView.Circle
				key={(latitude + longitude + this.props.radius).toString()}
				center={{ latitude, longitude }}
				radius={this.props.radius}
				strokeColor={'rgba(255, 0, 0, 1)'}
				fillColor={'rgba(255, 0, 0, 0.5)'}
			/>
		);
	}

	formatRegion(location: Location): Location {
		return {
			latitude: location.latitude,
			latitudeDelta: 0.035,
			longitude: location.longitude,
			longitudeDelta: 0.0175,
		};
	}

	render() {
		const { initialLocation, currentLocation, destination } = this.props;

		if (!initialLocation) {
			return (
				<View style={styles.container}>
					<Text>Loading...</Text>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<MapView
					ref={(map: any) => (this.map = map)}
					style={styles.map}
					initialRegion={this.formatRegion(initialLocation)}
				>
					{this.renderMarker(
						currentLocation ? currentLocation : initialLocation,
						'currentLocation',
					)}
					{this.renderMarker(destination, 'destination')}
					{this.renderTarget()}
				</MapView>
			</View>
		);
	}
}

export default Map;

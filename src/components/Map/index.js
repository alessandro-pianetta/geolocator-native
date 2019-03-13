import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Animated, AnimatedRegion } from 'react-native-maps';
import styles from './styles';
import { normalizeName } from '../../utils/textUtils';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { destination: false };
  }

  componentDidUpdate(prevProps) {
    const { initialLocation, currentLocation, destination } = this.props;

    if (currentLocation && destination) {
      const midRegion = this.formatRegion({
        latitude: ((currentLocation.latitude + destination.latitude) / 2),
        longitude: ((currentLocation.longitude + destination.longitude) / 2)
      });

      if (destination && !this.state.destination) {
        this.setState({ destination: true });
        const destinationRegion = this.formatRegion(destination);
        this.map.animateToRegion(destinationRegion);
      } else {
        this.map.fitToElements(true);
        this.map.animateToRegion(midRegion);
      };
    };
  }

  renderMarker(location, markerName) {
    if (!location) {
      return;
    };

    const blue = require('../../../assets/images/currentLocation.png');

    return (
      <MapView.Marker
        ref={marker => this[markerName] = marker}
        coordinate={location}
        image={markerName === 'currentLocation' ? blue : ''}
        title={normalizeName(markerName)}
      />
    );
  }

  renderTarget(radius) {
    if (!this.props.destination) {
      return;
    };

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

  formatRegion(location) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.035,
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
    };


    return (
      <View
        style={styles.container}
      >
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          initialRegion={this.formatRegion(initialLocation)}
        >
          {this.renderMarker(currentLocation ? currentLocation : initialLocation, 'currentLocation')}
          {this.renderMarker(destination, 'destination')}
          {this.renderTarget()}
        </MapView>
      </View>
    );
  }
}

export default Map;

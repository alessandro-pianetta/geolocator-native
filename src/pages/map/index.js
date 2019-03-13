import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
// Styles
import styles from './styles';
// Components
import Map from '../../components/Map';
import Form from '../../components/Form';
// Redux
import { getLocation, watchLocation } from '../../redux/Location/actions';

class MapPage extends PureComponent {
  componentWillMount() {
    this.props.getLocation();
  };

  componentDidUpdate(prevProps) {
    const { destination, radius, watchLocation } = this.props;

    if (destination !== prevProps.destination) {
      watchLocation(destination, radius);
    };
  };

  render() {
    const { initialLocation, currentLocation, destination, radius } = this.props;

    return (
      <View style={styles.container}>
        <Map
          initialLocation={initialLocation}
          currentLocation={currentLocation}
          destination={destination}
          radius={radius}
        />
        <Form />
      </View>
    );
  };
};

const mapStateToProps = state => ({
    initialLocation: state.initialLocation,
    currentLocation: state.currentLocation,
    destination: state.destination,
    radius: state.radius
  });


export default connect(mapStateToProps, { getLocation, watchLocation })(MapPage);

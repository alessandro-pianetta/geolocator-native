import React from 'react';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from './styles';

const GooglePlaces = (props) => (
  <GooglePlacesAutocomplete
    placeholder='Search'
    minLength={2}
    autoFocus={false}
    returnKeyType={'search'}
    listViewDisplayed='true'
    renderDescription={row => row.description}
    onPress={data => props.onPress(data.description)}
    getDefaultValue={() => ''}
    query={{
      key: 'AIzaSyA2DeZtGcwmhCkMqdfLY651fZo579BFtM4',
      language: 'en',
    }}
    styles={styles}
    nearbyPlacesAPI='GooglePlacesSearch'
    GoogleReverseGeocodingQuery={{
    }}
    GooglePlacesSearchQuery={{
      rankby: 'distance',
    }}
    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
  />
)

export default GooglePlaces;
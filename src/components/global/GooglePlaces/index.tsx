import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from '../../../consts/api';
import styles from './styles';

interface Props {
	onPress(event: any): void;
}

const GooglePlaces = (props: Props) => (
	<GooglePlacesAutocomplete
		placeholder='Search'
		minLength={2}
		autoFocus={false}
		returnKeyType={'search'}
		listViewDisplayed='true'
		renderDescription={(row: any) => row.description}
		onPress={(data: any) => props.onPress(data.description)}
		getDefaultValue={() => ''}
		query={{
			key: PLACES_API_KEY,
			language: 'en',
		}}
		styles={styles}
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
);

export default GooglePlaces;

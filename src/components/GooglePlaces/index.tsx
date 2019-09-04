import React, { PureComponent } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../../consts/api';
import styles from './styles';

interface Props {
	editable: boolean;
	onPress(event: any): void;
}

class GooglePlaces extends PureComponent<Props> {
	render() {
		const { onPress, editable } = this.props;
		return (
			<GooglePlacesAutocomplete
				editable={editable}
				placeholder='Search'
				minLength={2}
				autoFocus={false}
				returnKeyType={'search'}
				listViewDisplayed='true'
				renderDescription={(row: any) => row.description}
				onPress={(data: any) => onPress(data.description)}
				getDefaultValue={() => ''}
				query={{
					key: MAPS_API_KEY,
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
	}
}

export default GooglePlaces;

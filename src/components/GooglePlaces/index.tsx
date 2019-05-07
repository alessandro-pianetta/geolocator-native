import React, { PureComponent } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../../consts/api';
import styles from './styles';

interface Props {
	address: string;
	onPress(event: any): void;
}

interface State {
	hasData: boolean;
}

class GooglePlaces extends PureComponent<Props, State> {
	places: any;
	state = {
		hasData: false,
	};

	componentWillReceiveProps = (nextProps: Props) => {
		const hasData = !!nextProps.address;
		if (hasData) {
			this.places.setAddressText(nextProps.address);
		}

		this.setState({ hasData });
	}

	render() {
		const { onPress, address } = this.props;
		const { hasData } = this.state;

		return (
			<GooglePlacesAutocomplete
				ref={(ref: any) => (this.places = ref)}
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

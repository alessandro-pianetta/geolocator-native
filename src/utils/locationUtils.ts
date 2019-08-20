import { Alert } from 'react-native';
import store from '../store';
import { getETA, resetApp, updateLocation } from './../redux/Location/actions';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

const checkDistance = (current: Location, destination: Location) => {
	if (!destination) {
		console.log('No target');
		return undefined;
	}

	const p = 0.017453292519943295; // Math.PI / 180
	const c = Math.cos;
	const a =
		0.5 -
		c((destination.latitude - current.latitude) * p) / 2 +
		(c(current.latitude * p) *
			c(destination.latitude * p) *
			(1 - c((destination.longitude - current.longitude) * p))) /
			2;

	return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

const watchLocation = (destination: Location, radius: string) => {
	const success = async (pos: any) => {
		try {
			const crd = pos.coords;
			const distance = checkDistance(crd, destination);
			if (typeof distance === 'number' && distance <= radius / 1000) {
				navigator.geolocation.clearWatch(id);
				store.dispatch(getETA(crd, destination));
				Alert.alert('You have arrived at your destination', '', [
					{
						text: 'OK',
						onPress: () => store.dispatch(resetApp()),
					},
				]);
				return;
			} else {
				store.dispatch(updateLocation(crd));
			}
		} catch (error) {
			console.warn(error);
		}
	};

	const error = (err: any) => {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	const id = navigator.geolocation.watchPosition(success, error);
	return id;
};

export { checkDistance, watchLocation };

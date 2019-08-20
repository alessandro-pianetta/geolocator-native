// TODO: Add dispatch types

import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { MAPS_API_KEY } from '../../consts/api';
import store from '../../store';
import * as types from './types';
// import { text } from 'react-native-communications';

interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

export const resetApp = () => ({
	type: types.RESET_APP,
});

export const getLocation = () => {
	return dispatch => {
		navigator.geolocation.getCurrentPosition(pos => {
			dispatch({ type: types.GET_LOCATION, payload: pos.coords });
		});
	};
};

export const formatAddress = (address: string) => {
	return dispatch => {
		axios
			.post(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_API_KEY}`,
			)
			.then(response => {
				const loc = response.data.results[0].geometry.location;
				dispatch({ type: types.FORMAT_ADDRESS, payload: loc });
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const updateLocation = (coords: Location) => {
	return (dispatch: any) => {
		dispatch({ type: types.WATCH_LOCATION, payload: coords });
	};
};

export const convertRadius = (radius: string, units: boolean) => {
	let meters;
	if (units) {
		meters = parseFloat(radius) * 1000;
	} else {
		meters = parseFloat(radius) * 1609.34;
	}
	return { type: types.CONVERT_RADIUS, payload: meters };
};

export const getETA = (currentLoc: Location, destination: Location) => {
	return async (dispatch: any) => {
		try {
			const DISTANCE_MATRIX_API_KEY = MAPS_API_KEY;
			const response = await axios.post(
				`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
					currentLoc.latitude
				},${currentLoc.longitude}&destinations=${
					destination.latitude
				},${destination.longitude}&key=${DISTANCE_MATRIX_API_KEY}`,
			);
			const eta = response.data.rows[0].elements[0].duration.text;
			const message = `Your ride will arrive at your location in ${eta}.`;
			const phoneNum = '+16503845666';
			// text(phoneNum, message)
			dispatch({ type: types.ETA, payload: eta });
		} catch (error) {
			console.log(error);
		}
	};
};

export const addCallToHistory = (
	firstName: string,
	message: string,
	phoneNumber: string,
) => async () => {
	try {
		const userId = await AsyncStorage.getItem('uid');
		const date = `${Date.now()}`;
		const ref = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('history')
			.doc(date);
		await ref.set({
			createdAt: date,
			firstName: 'Alex',
			message,
			phoneNumber,
		});
	} catch (error) {
		console.error(error);
	}
};

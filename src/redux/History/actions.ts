import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import * as types from './types';

export const getHistory = () => async dispatch => {
	try {
		const userId = await AsyncStorage.getItem('uid');
		const date = `${Date.now()}`;
		const ref = await firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('history')
			.get();
		const payload = [];
		ref.docs.forEach(item => {
			const data = item.data();
			payload.push(data);
		});
		return dispatch({ type: types.GET_HISTORY, payload });
	} catch (error) {
		console.error(error);
	}
};

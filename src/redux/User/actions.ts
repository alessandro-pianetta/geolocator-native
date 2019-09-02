import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import * as types from './types';

export const getUser = () => {
	return async (dispatch: any) => {
		try {
			const userId = await AsyncStorage.getItem('uid');
			const ref = await firebase
				.firestore()
				.collection('users')
				.doc(userId)
				.get();
			const userInfo = ref.data();
			return dispatch({ type: types.GET_USER, payload: userInfo });
		} catch (error) {
			console.error(error);
		}
	};
};

export const updateUser = (
	firstName: string,
	lastName: string,
	defaultRadius: string,
	usesMetric: boolean,
) => {
	return async (dispatch: any) => {
		try {
			const userId = await AsyncStorage.getItem('uid');
			const date = `${Date.now()}`;
			const ref = await firebase
				.firestore()
				.collection('users')
				.doc(userId)
				.set(
					{
						defaultRadius,
						firstName,
						lastName,
						usesMetric,
					},
					{ merge: true },
				);

			return dispatch({
				type: types.UPDATE_USER,
				payload: { firstName, lastName, defaultRadius, usesMetric },
			});
		} catch (error) {
			console.error(error);
		}
	};
};

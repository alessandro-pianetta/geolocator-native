import { AsyncStorage } from 'react-native';
import { getAllWithoutPhotos } from 'react-native-contacts';
import firebase from 'react-native-firebase';

import * as types from './types';

export const getContacts = () => async dispatch => {
	try {
		getAllWithoutPhotos((err, phoneContacts) => {
			const payload = phoneContacts.map(contact => ({
				...contact,
				firstName: contact.givenName,
				name: contact.familyName,
			}));
			return dispatch({ type: types.GET_CONTACTS, payload });
		});
	} catch (error) {
		console.error(error);
	}
};

export const getContact = (recordID: string) => async dispatch => {
	try {
		const userId: any = await AsyncStorage.getItem('uid');
		const date: string = `${Date.now()}`;
		const ref = await firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('contacts')
			.doc(recordID)
			.get();
		const contact = ref.data();
		if (!contact) {
			return dispatch({
				type: types.GET_CONTACT,
				payload: { recordID, radius: '', customMessage: '' },
			});
		}
		return dispatch({
			type: types.GET_CONTACT,
			payload: { recordID, ...contact },
		});
	} catch (error) {
		console.error(error);
	}
};

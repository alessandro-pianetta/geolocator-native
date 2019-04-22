import { AsyncStorage } from 'react-native';
import { getAllWithoutPhotos } from 'react-native-contacts';
import firebase from 'react-native-firebase';

import * as types from './types';

export const getContactsStart = () => ({
	type: types.GET_CONTACTS_START,
});

export const getContactsFail = error => ({
	type: types.GET_CONTACTS_FAILURE,
	payload: { error },
});

export const getContacts = () => async dispatch => {
	getContactStart();
	try {
		getAllWithoutPhotos((err, phoneContacts) => {
			const contacts = phoneContacts.map(contact => {
				const { phoneNumbers, postalAddresses } = contact;
				let mobilePhone = phoneNumbers.filter(
					(num: any) => num.label === 'mobile',
				);
				mobilePhone.length
					? (mobilePhone = mobilePhone[0].number)
					: (mobilePhone = '');

				let address = postalAddresses.filter(
					(loc: any) => loc.label === 'home',
				);
				address.length ? (address = address[0]) : (address = '');

				return {
					...contact,
					firstName: contact.givenName,
					name: contact.familyName,
					mobile: mobilePhone,
					address,
				};
			});

			return dispatch({
				type: types.GET_CONTACTS_SUCCESS,
				payload: { contacts },
			});
		});
	} catch (error) {
		getContactsFail(error);
		console.error(error);
	}
};

export const getContact = (recordID: string) => async dispatch => {
	dispatch(getContactStart());
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
				type: types.GET_CONTACT_SUCCESS,
				payload: { recordID, radius: '', customMessage: '' },
			});
		}
		return dispatch({
			type: types.GET_CONTACT_SUCCESS,
			payload: { recordID, ...contact },
		});
	} catch (error) {
		dispatch(getContactFail(error));
		console.error(error);
	}
};

export const getContactStart = () => ({
	type: types.GET_CONTACT_START,
});

export const getContactFail = error => ({
	type: types.GET_CONTACT_FAILURE,
	payload: { error },
});

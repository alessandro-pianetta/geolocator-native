import { AsyncStorage } from 'react-native';
import { getAllWithoutPhotos, updateContact } from 'react-native-contacts';
import firebase from 'react-native-firebase';
import { formatContact } from './../../utils/contactUtils';

import * as types from './types';

// GET ALL CONTACTS FROM PHONE

export const contactStart = () => ({
	type: types.CONTACT_START,
});

export const contactFail = error => ({
	type: types.CONTACT_FAILURE,
	payload: error,
});

export const getContacts = (recordID: string) => async dispatch => {
	dispatch(contactStart());
	try {
		getAllWithoutPhotos((err, phoneContacts) => {
			const contacts = phoneContacts.map(contact => {
				return formatContact(contact);
			});

			return dispatch({
				type: types.GET_CONTACTS,
				payload: { contacts },
			});
		});
	} catch (error) {
		dispatch(contactFail(error));
		console.error(error);
	}
};

// GET SINGLE CONTACT FROM DB

export const getContact = (recordID: string) => async dispatch => {
	dispatch(contactStart());
	try {
		const userId: any = await AsyncStorage.getItem('uid');
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
		dispatch(contactFail(error));
		console.error(error);
	}
};

// ADD CONTACT IN APP

export const addContact = (contact: any) => {
	contactStart();
	try {
		const formattedContact = formatContact(contact);
		return {
			type: types.ADD_CONTACT,
			payload: { contact },
		};
	} catch (error) {
		contactFail(error);
		console.error(error);
	}
};

// EDIT CONTACT ON PHONE AND IN DB

export const editContact = (recordID: string, contactInfo: any) => async (
	dispatch: any,
) => {
	dispatch(contactStart());
	try {
		const userId: any = await AsyncStorage.getItem('uid');
		const ref = await firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('contacts')
			.doc(recordID)
			.set(
				{
					radius: contactInfo.radius,
					message: contactInfo.message,
				},
				{ merge: true },
			);

		getAllWithoutPhotos((err, phoneContacts) => {
			const contacts = phoneContacts.map(contact => {
				if (contact.recordID === recordID) {
					contact.givenName = contactInfo.givenName;
					contact.familyName = contactInfo.name;
					contact.phoneNumbers.forEach(num => {
						if (num.label === 'mobile') {
							num.number = contactInfo.mobile;
						}
					});
					const homeIndex = contact.postalAddresses.findIndex(
						address => address.label === 'home',
					);
					contact.postalAddresses.splice(
						homeIndex,
						1,
						contactInfo.address,
					);

					updateContact(contact, err => {
						if (err) throw err;
					});
				}
				return formatContact(contact);
			});
			return dispatch({
				type: types.EDIT_CONTACT,
				payload: { contacts },
			});
		});
	} catch (error) {
		dispatch(contactFail(error));
		console.error(error);
	}
};

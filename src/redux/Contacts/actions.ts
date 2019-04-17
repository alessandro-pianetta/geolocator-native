import { getAllWithoutPhotos } from 'react-native-contacts';

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

import * as types from './types';

const INITIAL_STATE = {
	contacts: [],
	error: '',
	loading: false,
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case types.CONTACT_START:
			return { ...state, loading: true };
		case types.CONTACT_FAILURE:
			return { ...state, error: action.payload, loading: false };

		case types.GET_CONTACTS:
			return {
				...state,
				contacts: action.payload.contacts,
				loading: false,
			};
		case types.GET_CONTACT:
			const contacts = state.contacts.map(
				(contact: any, index: number) => {
					if (contact.recordID === action.payload.recordID) {
						return { ...contact, ...action.payload };
					}
					return contact;
				},
			);
			return { ...state, contacts, loading: false };
		case types.EDIT_CONTACT:
			return {
				...state,
				contacts: action.payload.contacts,
				loading: false,
			};
		case types.ADD_CONTACT:
			const newContactsList = [...state.contacts];
			newContactsList.push(action.payload.contact);
			return { ...state, contacts: newContactsList, loading: false };
		default:
			return state;
	}
};

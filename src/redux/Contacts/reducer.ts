import * as types from './types';

const INITIAL_STATE = {
	contacts: [],
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case types.GET_CONTACTS:
			return { ...state, contacts: action.payload };
		case types.GET_CONTACT:
			const contacts = state.contacts.map(
				(contact: any, index: number) => {
					if (contact.recordID === action.payload.recordID) {
						return { ...contact, ...action.payload };
					}
					return contact;
				},
			);
			return { ...state, contacts };
		default:
			return state;
	}
};

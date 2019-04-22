import * as types from './types';

const INITIAL_STATE = {
	contacts: [],
	loading: false,
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case types.GET_CONTACTS_START:
			return { ...state, loading: true };
		case types.GET_CONTACTS_FAILURE:
			return { ...state, loading: false };
		case types.GET_CONTACTS_SUCCESS:
			return {
				...state,
				contacts: action.payload.contacts,
				loading: false,
			};

		case types.GET_CONTACT_START:
			return { ...state, loading: true };
		case types.GET_CONTACT_FAILURE:
			return { ...state, loading: false };
		case types.GET_CONTACT_SUCCESS:
			const contacts = state.contacts.map(
				(contact: any, index: number) => {
					if (contact.recordID === action.payload.recordID) {
						return { ...contact, ...action.payload };
					}
					return contact;
				},
			);
			return { ...state, contacts, loading: false };

		default:
			return state;
	}
};

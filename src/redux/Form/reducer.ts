import * as types from './types';

const INITIAL_STATE = {
	firstName: '',
	phoneNumber: '',
	message: '',
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case types.SET_FORM_INFO:
			return {
				...state,
				firstName: action.payload.firstName,
				phoneNumber: action.payload.phoneNumber,
				message: action.payload.message,
			};
		default:
			return state;
	}
};

import * as types from './types';

const INITIAL_STATE = {
	contacts: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_CONTACTS:
			return { ...state, contacts: action.payload };
		default:
			return state;
	}
};

import * as types from './types';

const INITIAL_STATE = {
	history: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_HISTORY:
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

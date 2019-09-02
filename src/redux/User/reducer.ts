import * as types from './types';

const INITIAL_STATE = {
	firstName: '',
	lastName: '',
	defaultRadius: '',
	usesMetric: false,
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case types.GET_USER:
			return {
				...state,
				...action.payload,
			};
		case types.UPDATE_USER:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

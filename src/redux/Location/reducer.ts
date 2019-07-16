import * as types from './types';

const INITIAL_STATE = {
	currentLocation: null,
	destination: null,
	initialLocation: null,
	radius: 0,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_LOCATION:
			return { ...state, initialLocation: action.payload };
		case types.FORMAT_ADDRESS:
			return {
				...state,
				destination: {
					latitude: action.payload.lat,
					longitude: action.payload.lng,
				},
			};
		case types.WATCH_LOCATION:
			return { ...state, currentLocation: action.payload };
		case types.CONVERT_RADIUS:
			return { ...state, radius: action.payload };
		case types.RESET_APP:
			return { ...state, destination: null, radius: 0 };
		default:
			return state;
	}
};

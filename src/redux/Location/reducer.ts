import * as types from './types';

const INITIAL_STATE = {
	currentLocation: {},
	destination: {},
	initialLocation: {},
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
			console.log(action.payload);
			return { ...state, radius: action.payload };
		default:
			return state;
	}
};

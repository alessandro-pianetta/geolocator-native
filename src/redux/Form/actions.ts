import * as types from './types';

export const setFormInfo = (
	firstName: string = '',
	phoneNumber: string = '',
	message: string = '',
) => ({
	type: types.SET_FORM_INFO,
	payload: { firstName, phoneNumber, message },
});

import { PermissionsAndroid } from 'react-native';
import RNContacts from 'react-native-contacts';
import { getContacts } from '../redux/Contacts/actions';
import store from '../store';

const requestAndroidViewContactPermissions = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
			{
				title: 'Geolocator View Contact Information',
				message:
					'Geolocator needs access to your contacts ' +
					'so you can easily autofill the forms.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can view the contact book');
			store.dispatch(getContacts());
		} else {
			console.log('Contact book view permission denied');
		}
	} catch (err) {
		console.warn(err);
	}
};
const requestAndroidWriteContactPermissions = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
			{
				title: 'Geolocator Write Contact Information',
				message:
					'Geolocator needs access to your contacts ' +
					'so you can easily edit their information.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can edit the contact book');
		} else {
			console.log('Contact book write permission denied');
		}
	} catch (err) {
		console.warn(err);
	}
};

const requestiOSContactPermissions = async () => {
	RNContacts.checkPermission((err, permission) => {
		if (err) throw err;

		// RNContacts.PERMISSION_AUTHORIZED || RNContacts.PERMISSION_UNDEFINED || RNContacts.PERMISSION_DENIED
		if (permission === 'undefined') {
			RNContacts.requestPermission((err, permission) => {
				if (permission === 'authorized') store.dispatch(getContacts());
			});
		}
		if (permission === 'authorized') {
			store.dispatch(getContacts());
		}
	});
};

export {
	requestAndroidViewContactPermissions,
	requestAndroidWriteContactPermissions,
	requestiOSContactPermissions,
};

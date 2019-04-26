export const formatContact = (contact: any) => {
	const { phoneNumbers, postalAddresses } = contact;
	let mobilePhone = phoneNumbers.filter((num: any) => num.label === 'mobile');
	mobilePhone.length
		? (mobilePhone = mobilePhone[0].number)
		: (mobilePhone = '');

	let address = postalAddresses.filter((loc: any) => loc.label === 'home');
	address.length ? (address = address[0]) : (address = '');

	return {
		...contact,
		name: contact.familyName,
		mobile: mobilePhone,
		address,
	};
};

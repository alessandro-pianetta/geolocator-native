const formatPhoneNumber = (phoneNumberString: string) => {
	const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3];
	}
	return null;
};

const formatContact = (contact: any) => {
	const { phoneNumbers, postalAddresses } = contact;
	let mobilePhone = phoneNumbers.filter((num: any) => num.label === 'mobile');
	mobilePhone.length
		? (mobilePhone = formatPhoneNumber(mobilePhone[0].number))
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

export { formatPhoneNumber, formatContact };

const normalizeName = (name: string) => {
	if (typeof name !== 'string') return '';

	return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => {
		return str.toUpperCase();
	});
};

export { normalizeName };

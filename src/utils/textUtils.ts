const normalizeName = (name: string) => {
	return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => {
		return str.toUpperCase();
	});
};

export { normalizeName };

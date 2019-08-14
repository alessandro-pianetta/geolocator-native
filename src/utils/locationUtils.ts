interface Location {
	longitude: number;
	latitude: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
}

const checkDistance = (current: Location, destination: Location) => {
	if (!destination) {
		console.log('No target');
		return undefined;
	}

	const p = 0.017453292519943295; // Math.PI / 180
	const c = Math.cos;
	const a =
		0.5 -
		c((destination.latitude - current.latitude) * p) / 2 +
		(c(current.latitude * p) *
			c(destination.latitude * p) *
			(1 - c((destination.longitude - current.longitude) * p))) /
			2;

	return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export { checkDistance };

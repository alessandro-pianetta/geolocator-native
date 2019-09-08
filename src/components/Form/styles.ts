import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	border: {
		borderColor: 'black',
		borderWidth: 1,
		marginTop: 50,
		width: '100%',
	},
	container: {
		flex: 1,
	},
	inputContainer: {
		flex: 1,
		paddingVertical: 20,
	},
});

const GooglePlacesStyles = StyleSheet.create({
	container: {
		overflow: 'visible',
		width: '100%',
		zIndex: 10,
	},
	description: {
		color: '#1faadb',
	},
	listView: {
		backgroundColor: 'white',
		elevation: 3,
		flex: 1,
		position: 'absolute',
		top: 50,
		width: '100%',
		zIndex: 10,
		borderBottomWidth: 2,
		borderColor: 'black',
	},
	predefinedPlacesDescription: {
		color: '#1faadb',
	},
	textInput: {
		backgroundColor: 'transparent',
		fontSize: 15,
		lineHeight: 15,
		paddingBottom: 0,
	},
	textInputContainer: {
		backgroundColor: 'white',
		borderBottomWidth: 0,
		borderColor: 'white',
		borderTopWidth: 0,
		height: 50,
		overflow: 'visible',
	},
});

export { styles, GooglePlacesStyles };

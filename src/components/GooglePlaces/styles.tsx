import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexGrow: 0,
		flexShrink: 0,
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
		flex: 1,
		fontSize: 15,
		lineHeight: 20,
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

export default styles;

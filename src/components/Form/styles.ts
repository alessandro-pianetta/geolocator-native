import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	border: {
		borderColor: 'black',
		borderWidth: 1,
		width: '100%',
	},
	container: {
		flex: 1,
	},
	inputContainer: {
		flex: 1,
	},
});

const GooglePlacesStyles = StyleSheet.create({
	container: {
		flexGrow: 0,
		flexShrink: 0,
		zIndex: 10,
		elevation: 10,
		overflow: 'visible',
	},
	description: {},
	textInputContainer: {
		backgroundColor: 'white',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderBottomColor: '#7e7e7e',
	},
	textInput: {},
	loader: {},
	listView: {
		elevation: 10,
		backgroundColor: 'white',
		flex: 1,
		position: 'absolute',
		zIndex: 10,
		top: 44,
	},
	predefinedPlacesDescription: {},
	poweredContainer: {
		borderTopColor: '#b5b5b5',
		borderTopWidth: 0.333,
		borderBottomColor: '#b5b5b5',
		borderBottomWidth: 1,
	},
	powered: {},
	separator: {},
	row: {},

	// container: {
	// overflow: 'visible',
	// width: '100%',
	// },
	// description: {
	// color: '#1faadb',
	// },
	// listView: {
	// backgroundColor: 'white',
	// elevation: 3,
	// flex: 1,
	// position: 'absolute',
	// top: 50,
	// width: '100%',
	// zIndex: 10,
	// borderBottomWidth: 2,
	// borderColor: 'black',
	// },
	// predefinedPlacesDescription: {
	// color: '#1faadb',
	// },
	// textInput: {
	// 	backgroundColor: 'transparent',
	// fontSize: 15,
	// lineHeight: 15,
	// paddingBottom: 0,
	// },
	// textInputContainer: {
	// backgroundColor: 'white',
	// borderBottomWidth: 0,
	// borderColor: 'white',
	// borderTopWidth: 0,
	// height: 50,
	// overflow: 'visible',
	// },
});

export { styles, GooglePlacesStyles };

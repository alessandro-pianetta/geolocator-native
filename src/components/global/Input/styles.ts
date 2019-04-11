import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		marginBottom: 20,
		marginLeft: '5%',
		width: '90%',
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		height: 35,
		paddingLeft: 5,
		paddingRight: 5,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 5,
		marginLeft: -10,
	},
	switch: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		width: '100%',
	},
});

export default styles;

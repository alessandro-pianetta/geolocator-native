import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default styles;

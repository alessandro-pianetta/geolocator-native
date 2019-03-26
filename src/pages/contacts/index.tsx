import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

interface Props {}

interface State {}

class ContactsPage extends PureComponent<Props, State> {
	componentWillMount() {}

	render() {
		const {} = this.props;

		return (
			<View style={styles.container}>
				{
					// 	<TouchableOpacity
					// 	style={{
					// 		flexDirection: 'row',
					// 		width: '100%',
					// 		alignItems: 'center',
					// 		justifyContent: 'space-between',
					// 		paddingHorizontal: 20,
					// 		paddingVertical: 10,
					// 		borderBottomWidth: 1,
					// 		borderColor: 'gray',
					// 	}}
					// >
					// 	<View>
					// 		<Text style={styles.primaryText}>Chance</Text>
					// 		<Text style={styles.secondaryText}>(123) 456-7890</Text>
					// 	</View>
					// 	<View>
					// 		{
					// 			// today? 10:44 PM : Yesterday : Friday : 3/14/19
					// 		}
					// 		<Text style={styles.secondaryText}>5:23 PM</Text>
					// 	</View>
					// 	<Text style={styles.icon}>⭐️</Text>
					// </TouchableOpacity>
				}
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(
	mapStateToProps,
	null,
)(ContactsPage);

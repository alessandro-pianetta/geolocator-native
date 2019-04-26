import React, { PureComponent } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RNContacts from 'react-native-contacts';
import SectionListContacts from 'react-native-sectionlist-contacts';
import { connect } from 'react-redux';

import Border from '../../components/global/Border';
import styles from './styles';

interface Props {
	contacts: [];
}

interface State {}

class ContactsPage extends PureComponent<Props, State> {
	sectionList: any;

	componentWillMount() {}

	renderItem = (item, index, section) => (
		<View style={{ flex: 1 }} key={`${item}${index}`}>
			<TouchableOpacity
				style={styles.clickable}
				onPress={() =>
					this.props.navigation.navigate('ContactInfo', { ...item })
				}
			>
				<Text>{item.givenName} </Text>
				<Text style={styles.lastName}>{item.name}</Text>
			</TouchableOpacity>
		</View>
	)

	render() {
		const { contacts } = this.props;

		return (
			<ScrollView style={styles.container}>
				<SectionListContacts
					ref={(ref: any) => (this.sectionList = ref)}
					sectionListData={contacts}
					initialNumToRender={
						contacts.length > 25 ? 25 : contacts.length
					}
					renderItem={this.renderItem}
					otherAlphabet='#'
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: any) => ({
	contacts: state.contacts.contacts,
});

export default connect(
	mapStateToProps,
	null,
)(ContactsPage);

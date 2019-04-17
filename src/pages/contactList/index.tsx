import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNContacts from 'react-native-contacts';
import SectionListContacts from 'react-native-sectionlist-contacts';
import { connect } from 'react-redux';

import Border from '../../components/global/Border';
import styles from './styles';

interface Props {}

interface State {}

class ContactsPage extends PureComponent<Props, State> {
	sectionList: any;
	state = {
		contacts: [],
	};

	componentWillMount() {
		RNContacts.getAll((err, phoneContacts) => {
			const contacts = phoneContacts.map(contact => ({
				...contact,
				firstName: contact.givenName,
				name: contact.familyName,
			}));
			this.setState({ contacts });
		});
	}

	renderItem = (item, index, section) => (
		<View style={{ flex: 1 }} key={`${item}${index}`}>
			<TouchableOpacity
				style={styles.clickable}
				onPress={() =>
					this.props.navigation.navigate('ContactInfo', { ...item })
				}
			>
				<Text>{item.firstName} </Text>
				<Text style={styles.lastName}>{item.name}</Text>
			</TouchableOpacity>
		</View>
	)

	render() {
		const {} = this.props;

		return (
			<View style={styles.container}>
				<SectionListContacts
					ref={(ref: any) => (this.sectionList = ref)}
					sectionListData={this.state.contacts}
					initialNumToRender={
						this.state.contacts.length > 25
							? 25
							: this.state.contacts.length
					}
					renderItem={this.renderItem}
					otherAlphabet='#'
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(
	mapStateToProps,
	null,
)(ContactsPage);

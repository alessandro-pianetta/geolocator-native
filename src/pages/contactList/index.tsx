import React, { PureComponent } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import RNContacts from 'react-native-contacts';
import Contacts from 'react-native-contacts';
import SectionListContacts from 'react-native-sectionlist-contacts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import { formatContact } from '../../utils/contactUtils';

import Border from '../../components/global/Border';
import { addContact } from '../../redux/Contacts/actions';
import styles from './styles';

interface Props {
	contacts: any;
}

interface State {
	searchText: string;
	contacts: any;
}

class ContactsPage extends PureComponent<Props, State> {
	sectionList: any;
	state = {
		searchText: '',
		contacts: this.props.contacts,
	};

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
		const searchForm = [
			{
				onChangeText: (searchText: string) => {
					let contacts;
					if (searchText) {
						contacts = this.props.contacts.filter(
							(contact: any) =>
								contact.givenName.includes(searchText) ||
								contact.name.includes(searchText),
						);
					} else {
						contacts = this.props.contacts;
					}
					this.setState({ searchText, contacts });
				},
				placeholder: 'Search',
				value: this.state.searchText,
			},
		];

		return (
			<SafeAreaView style={styles.container}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
						marginRight: 15,
						marginBottom: 20,
					}}
				>
					<Form form={searchForm} />
					<TouchableOpacity
						onPress={() => {
							Contacts.openContactForm({}, (err, contact) => {
								if (err) throw err;
								// contact has been saved
								const newContact = formatContact(contact);
								addContact(newContact);
								const contacts = [
									...this.state.contacts,
									newContact,
								];
								this.setState({
									contacts,
								});
							});
						}}
					>
						<Icon name='user-plus' size={35} />
					</TouchableOpacity>
				</View>
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
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: any) => ({
	contacts: state.contacts.contacts,
});

export default connect(
	mapStateToProps,
	{ addContact },
)(ContactsPage);

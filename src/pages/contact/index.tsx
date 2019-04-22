import React, { PureComponent } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import { getContact } from '../../redux/Contacts/actions';
import styles from './styles';

export interface Props {
	navigation: any;
	getContact(recordId: string): void;
}

class ContactPage extends PureComponent<Props, any> {
	static navigationOptions = ({ navigation }) => {
		const {
			state: {
				params: { firstName, name, editing, toggleEditing },
			},
		} = navigation;
		const userName = `${firstName} ${name}`;
		return {
			title: userName,
			headerRight: (
				<TouchableOpacity onPress={() => toggleEditing()}>
					<Text style={{ fontSize: 17, paddingRight: 15 }}>
						{editing ? 'Save' : 'Edit'}
					</Text>
				</TouchableOpacity>
			),
		};
	}

	constructor(props: Props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			mobile: '',
			radius: '',
			message: '',
			address: {
				city: '',
				country: '',
				label: '',
				postCode: '',
				region: '',
				state: '',
				street: '',
			},
			addressStr: '',
			editing: false,
			loading: false,
		};
	}

	componentDidMount = async () => {
		const { navigation } = this.props;
		navigation.setParams({
			toggleEditing: this.toggleEditing,
			editing: false,
		});

		const {
			state: {
				params: { recordID },
			},
		} = navigation;

		// tslint:disable-next-line: await-promise
		await this.props.getContact(recordID);
		const contact = this.props.contacts.filter(
			(contact: any) => contact.recordID === recordID,
		)[0];

		this.setState({ ...contact });
	}

	toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
		this.props.navigation.setParams({
			editing: !this.props.navigation.state.params.editing,
		});
	}

	renderInfo = item => {
		switch (typeof item.value) {
			case 'boolean':
				return <Text>{item.value ? 'true' : 'false'}</Text>;
			case 'object':
				return (
					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
						}}
					>
						<Text style={{ marginLeft: 10 }}>
							{Object.keys(item.value).length ? '' : null}
						</Text>
					</View>
				);
			default:
				return (
					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
						}}
					>
						<Text style={{ marginLeft: 10 }}>
							{item.value ? item.value : null}
						</Text>
					</View>
				);
		}
	}

	render() {
		const {
			firstName,
			lastName,
			mobile,
			address,
			radius,
			message,
			editing,
		} = this.state;

		const mapForm = [
			{
				labelText: 'First Name',
				onChangeText: (recipient: string) => {
					this.setState({ firstName: recipient });
				},
				placeholder: 'Alex',
				value: firstName,
			},
			{
				labelText: 'Last Name',
				onChangeText: (recipient: string) => {
					this.setState({ lastName: recipient });
				},
				placeholder: 'Alex',
				value: lastName,
			},
			{
				keyboardType: 'phone-pad',
				labelText: 'Phone number',
				onChangeText: (phoneNumber: string) => {
					this.setState({ mobile: phoneNumber });
				},
				placeholder: '(123) 456-7890',
				value: mobile,
			},
			{
				labelText: 'Address',
				onChangeText: (text: string, field: string) => {
					this.setState({
						address: { ...this.state.address, [field]: text },
					});
				},
				placeholder: '',
				object: address,
				type: 'address',
				value:
					address.street ||
					address.city ||
					address.state ||
					address.postCode ||
					address.country
						? `${address.street}\n${address.city} ${
								address.state
						  } ${address.postCode}\n${address.country}`
						: '',
			},
			{
				keyboardType: 'numeric',
				labelText: `Default alert radius`,
				onChangeText: (defaultRadius: string) =>
					this.setState({ radius: defaultRadius }),
				placeholder: '2',
				value: radius,
			},
			{
				labelText: 'Custom message',
				multiline: true,
				numberOfLines: 4,
				onChangeText: (customMessage: string) => {
					this.setState({ message: customMessage });
				},
				placeholder: 'Enter custom message here',
				value: message,
			},
		];

		if (this.props.loading) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				{editing ? (
					<Form form={mapForm} />
				) : (
					mapForm.slice(2, 6).map((item, index) => (
						<View
							style={styles.item}
							key={`contactInfoItem${index}`}
						>
							<Text
								style={[
									{ fontWeight: 'bold' },
									!item.value && { color: '#00000080' },
								]}
							>
								{item.labelText}
							</Text>
							{this.renderInfo(item)}
						</View>
					))
				)}
			</View>
		);
	}
}

const mapStateToProps = (state: any) => {
	console.log(state.contacts);
	return {
		contacts: state.contacts.contacts,
		loading: state.contacts.loading,
	};
};

export default connect(
	mapStateToProps,
	{ getContact },
)(ContactPage);

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Form from '../../components/Form/Form';
import styles from './styles';

export interface Props {
	navigation: any;
}

export default class ContactPage extends PureComponent<Props, any> {
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
			phone: '',
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
		};
	}

	componentDidMount = () => {
		const { navigation } = this.props;
		navigation.setParams({
			toggleEditing: this.toggleEditing,
			editing: false,
		});

		const {
			state: {
				params: { givenName, familyName, phoneNumbers, postalAddresses },
			},
		} = navigation;

		let mobilePhone = phoneNumbers.filter(
			(num: any) => num.label === 'mobile',
		);
		mobilePhone.length
			? (mobilePhone = mobilePhone[0].number)
			: (mobilePhone = this.state.phone);

		let address = postalAddresses.filter(
			(loc: any) => loc.label === 'home',
		);
		address.length
			? (address = address[0])
			: (address = this.state.address);

		this.setState({
			firstName: givenName,
			lastName: familyName,
			phone: mobilePhone,
			address,
		});
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
			phone,
			address,
			radius,
			message,
			editing,
		} = this.state;

		console.log(this.state);

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
					this.setState({ phone: phoneNumber });
				},
				placeholder: '(123) 456-7890',
				value: phone,
			},
			{
				labelText: 'Address',
				onChangeText: location => {
					console.log(location);
				},
				placeholder: '',
				object: address,
				value: `${address.street} \n${address.city}, ${
					address.state
				} \n${address.postCode} ${address.country}`,
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

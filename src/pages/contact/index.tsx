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
			editing: false,
		};
	}

	componentDidMount = () => {
		this.props.navigation.setParams({
			toggleEditing: this.toggleEditing,
			editing: false,
		});
	}

	toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
		this.props.navigation.setParams({
			editing: !this.props.navigation.state.params.editing,
		});
	}

	render() {
		const {
			firstName,
			lastName,
			phone,
			radius,
			message,
			editing,
		} = this.state;

		const mapForm = [
			{
				labelText: 'First Name',
				onChangeText: (recipient: string) => {
					this.setState({ recipient });
				},
				placeholder: 'Alex',
				value: firstName,
			},
			{
				labelText: 'Last Name',
				onChangeText: (recipient: string) => {
					this.setState({ recipient });
				},
				placeholder: 'Alex',
				value: lastName,
			},
			{
				keyboardType: 'phone-pad',
				labelText: 'Phone number',
				onChangeText: (phone: string) => {
					this.setState({ phone });
				},
				placeholder: '(123) 456-7890',
				value: phone,
			},
			{
				keyboardType: 'numeric',
				labelText: `Default alert radius`,
				onChangeText: (radius: string) => this.setState({ radius }),
				placeholder: '2',
				value: radius,
			},
			{
				labelText: 'Custom message',
				multiline: true,
				numberOfLines: 4,
				onChangeText: (message: string) => {
					this.setState({ message });
				},
				placeholder: 'Enter custom message here',
				value: message,
			},
		];

		console.log(this.props.navigation);

		return (
			<View style={styles.container}>
				{editing ? (
					<Form form={mapForm} />
				) : (
					mapForm.slice(2, 5).map((item, index) => (
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
							{typeof item.value === 'boolean' ? (
								<Text>{item.value ? 'true' : 'false'}</Text>
							) : (
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
							)}
						</View>
					))
				)}
			</View>
		);
	}
}

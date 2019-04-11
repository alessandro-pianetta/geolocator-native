import React, { PureComponent } from 'react';
import { Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import styles from './styles';

interface Props {}

interface State {
	unit: boolean;
	firstName: string;
	lastName: string;
	message: string;
	radius: string;
}

class SettingsPage extends PureComponent<Props, State> {
	componentWillMount() {}
	state: State = {
		firstName: '',
		lastName: '',
		message: '',
		radius: '',
		unit: false,
	};

	render() {
		const {} = this.props;
		const { firstName, lastName, radius, message } = this.state;

		const settingsForm = [
			{
				labelText: 'First Name',
				onChangeText: (firstName: string) => {
					this.setState({ firstName });
				},
				placeholder: 'John',
				value: firstName,
			},

			{
				labelText: 'Last Name',
				onChangeText: (lastName: string) => {
					this.setState({ lastName });
				},
				placeholder: 'Smith',
				value: lastName,
			},
			{
				keyboardType: 'numeric',
				labelText: `Default radius`,
				onChangeText: (radius: string) => this.setState({ radius }),
				placeholder: '2',
				value: radius,
			},
			{
				labelText: 'Default message',
				multiline: true,
				numberOfLines: 4,
				onChangeText: (message: string) => {
					this.setState({ message });
				},
				placeholder: 'Enter custom message here',
				value: message,
			},
			{
				labelText: `Use Metric`,
				onValueChange: () => this.setState({ unit: !this.state.unit }),
				type: 'switch',
				value: this.state.unit,
			},
		];

		return (
			<View style={[styles.container, { paddingTop: 50 }]}>
				<Form noFlex={true} form={settingsForm} />
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(
	mapStateToProps,
	null,
)(SettingsPage);

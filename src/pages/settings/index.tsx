import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import { updateUser } from '../../redux/User/actions';
import styles from './styles';

interface User {
	firstName: string;
	lastName: string;
	usesMetric: boolean;
	defaultRadius: string;
}
interface Props {
	user: User;
}

interface State {
	unit: boolean;
	givenName: string;
	lastName: string;
	radius: string;
	hasBeenUpdated: boolean;
}

class SettingsPage extends PureComponent<Props, State> {
	state: State = {
		givenName: '',
		lastName: '',
		radius: '',
		unit: false,
		hasBeenUpdated: false,
	};

	componentWillMount() {
		const didBlurSubscription = this.props.navigation.addListener(
			'didBlur',
			payload => {
				if (this.state.hasBeenUpdated) {
					this.props.updateUser(
						this.state.givenName,
						this.state.lastName,
						this.state.radius,
						this.state.unit,
					);
					this.setState({ hasBeenUpdated: false });
				}
			},
		);

		this.setState({
			givenName: this.props.user.firstName,
			lastName: this.props.user.lastName,
			radius: this.props.user.defaultRadius,
			unit: this.props.user.usesMetric,
		});
	}

	componentDidUpdate() {
		if (!this.state.hasBeenUpdated) {
			this.setState({ hasBeenUpdated: true });
		}
	}

	render() {
		const {} = this.props;
		const { givenName, lastName, radius } = this.state;

		const settingsForm = [
			{
				labelText: 'First Name',
				onChangeText: (givenName: string) => {
					this.setState({ givenName });
				},
				placeholder: 'John',
				value: givenName,
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
				labelText: `Use Metric`,
				onValueChange: () => this.setState({ unit: !this.state.unit }),
				type: 'switch',
				value: this.state.unit,
			},
		];

		return (
			<SafeAreaView style={[styles.container]}>
				<Form noFlex={true} form={settingsForm} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.user,
});

export default connect(
	mapStateToProps,
	{ updateUser },
)(SettingsPage);

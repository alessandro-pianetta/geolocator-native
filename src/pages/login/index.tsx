import { Button } from 'prefab-components';
import React, { PureComponent } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';
import Form from '../../components/Form/Form';
import validate from '../../utils/formUtils';

interface Input {
	labelText: string;
	value: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	style: any;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
}

interface FormProps {
	form: Input[];
}

interface Props {
	navigation: any;
}

interface State {
	password: string;
	username: string;
	validated: boolean;
}

class LoginPage extends PureComponent<Props, State> {
	static navigationOptions = ({ navigation }: any) => {
		const {
			state: {
				params: { signUp },
			},
		} = navigation;
		return {
			headerRight: (
				<TouchableOpacity
					onPress={() => navigation.setParams({ signUp: !signUp })}
				>
					<Text>{!signUp ? 'Sign Up' : 'Log In'}</Text>
				</TouchableOpacity>
			),
			headerRightContainerStyle: { paddingRight: 20 },
			title: !signUp ? 'Log In' : 'Sign Up',
		};
	}

	state = {
		password: '',
		username: '',
		validated: false,
	};

	constraints: any = {
		password: {
			length: {
				message: '^Your password must be at least 6 characters',
				minimum: 6,
			},
			presence: {
				message: '^Please enter a password',
			},
		},
		username: {
			email: {
				message: '^Please enter a valid email address',
			},
			presence: {
				message: '^Please enter an email address',
			},
		},
	};

	componentDidUpdate = () => {
		const { username, password } = this.state;
		this.setState({
			validated: validate({ username, password }, this.constraints),
		});
	}

	createUser = (email: string, password: string) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((credential: any) => {
				if (credential) {
					console.log(
						'default app user ->',
						credential.user.toJSON(),
					);
					const { uid }: { uid: string } = credential.user.toJSON();
					AsyncStorage.setItem('uid', uid);
					this.props.navigation.navigate('LoggedIn');
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	signInUser = (email: string, password: string) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((credential: any) => {
				if (credential) {
					console.log(
						'default app user ->',
						credential.user.toJSON(),
					);
					const { uid }: { uid: string } = credential.user.toJSON();
					console.log('uid', uid);
					AsyncStorage.setItem('uid', uid);
					this.props.navigation.navigate('LoggedIn');
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const { validated, username, password } = this.state;
		const {
			navigation: {
				state: {
					params: { signUp },
				},
			},
		} = this.props;

		const loginForm: any = [
			{
				labelText: 'Username',
				onChangeText: (input: string) => {
					this.setState({
						username: input,
					});
				},
				placeholder: 'user@name.com',
				value: this.state.username,
			},
			{
				labelText: 'Password',
				onChangeText: (input: string) => {
					this.setState({
						password: input,
					});
				},
				placeholder: '********',
				secureTextEntry: true,
				value: this.state.password,
			},
		];

		return (
			<View style={{ flex: 1, marginVertical: 35 }}>
				<Form form={loginForm} validations={this.constraints} />
				{signUp ? (
					<Button
						full={true}
						bordered={!validated}
						success={true}
						onPress={() => {
							this.createUser(username, password);
						}}
						text='Sign Up'
					/>
				) : (
					<Button
						full={true}
						bordered={!validated}
						primary={true}
						onPress={() => {
							this.signInUser(username, password);
						}}
						text='Log In'
					/>
				)}
			</View>
		);
	}
}

export default LoginPage;

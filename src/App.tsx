/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import '../ReactotronConfig';
import createRootNavigator from '../routes';
import store from './store';
import { isLoggedIn } from './utils/authUtils';

export default class App extends PureComponent {
	state = {
		checkedLogin: false,
		loggedIn: false,
		contacts: [],
	};

	async componentDidMount() {
		const loggedIn = await isLoggedIn();
		this.setState({ loggedIn, checkedLogin: true });
	}

	renderAppContainer() {
		const { loggedIn, checkedLogin } = this.state;
		if (!checkedLogin) {
			return null;
		}
		const AppContainer = createRootNavigator(loggedIn);

		return <AppContainer />;
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>{this.renderAppContainer()}</View>
			</Provider>
		);
	}
}

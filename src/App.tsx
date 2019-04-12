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
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import '../ReactotronConfig';
import createRootNavigator from '../routes';
import historyReducer from './redux/History/reducer';
// Redux
import locationReducer from './redux/Location/reducer';

// Utilities
import { isLoggedIn } from './utils/authUtils';

const store = createStore(
	combineReducers({ location: locationReducer, history: historyReducer }),
	{},
	applyMiddleware(ReduxThunk),
);

export default class App extends PureComponent {
	state = {
		checkedLogin: false,
		loggedIn: false,
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

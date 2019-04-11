import {
	createAppContainer,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	createSwitchNavigator,
} from 'react-navigation';
// Components
import ContactPage from './src/pages/contact';
import ContactListPage from './src/pages/contactList';
import HistoryPage from './src/pages/history';
import LoginPage from './src/pages/login';
import MapPage from './src/pages/map';
import SettingsPage from './src/pages/settings';

const ContactStack = createStackNavigator({
	ContactList: {
		screen: ContactListPage,
		navigationOptions: () => ({
			header: null,
		}),
	},
	ContactInfo: {
		screen: ContactPage,
	},
});

const LoggedInStack = createBottomTabNavigator(
	{
		Map: {
			screen: MapPage,
		},
		// tslint:disable-next-line:object-literal-sort-keys
		ContactList: {
			screen: ContactStack,
			navigationOptions: () => ({
				title: `Contacts`,
			}),
		},
		// tslint:disable-next-line: object-literal-sort-keys
		History: {
			screen: HistoryPage,
		},
		Settings: {
			screen: SettingsPage,
		},
	},
	{
		initialRouteName: 'Map',
	},
);

const LoggedOutStack = createStackNavigator({
	Auth: {
		params: { signUp: false },
		screen: LoginPage,
	},
});

const createRootNavigator = (loggedIn = false) => {
	const initialRouteName = () => (loggedIn ? 'LoggedIn' : 'LoggedOut');
	const AuthStack = createSwitchNavigator(
		{
			LoggedIn: {
				screen: LoggedInStack,
			},
			LoggedOut: {
				screen: LoggedOutStack,
			},
		},
		{
			initialRouteName: initialRouteName(),
		},
	);

	return createAppContainer(AuthStack);
};

export default createRootNavigator;

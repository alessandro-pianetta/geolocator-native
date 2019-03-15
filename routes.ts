import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator,
	createSwitchNavigator,
} from 'react-navigation';
// Components
import LoginPage from './src/pages/login';
// import MapPage from "./src/pages/map";

// const LoggedInStack = createBottomTabNavigator({
//   Map: {
//     screen: MapPage
//   }
// });

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
			LoggedOut: {
				screen: LoggedOutStack,
			},
			// LoggedIn: {
			//   screen: LoggedInStack
			// }
		},
		{
			initialRouteName: initialRouteName(),
		},
	);

	return createAppContainer(AuthStack);
};

export default createRootNavigator;

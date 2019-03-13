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
import React, { Component } from "react";
import { View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
// Redux
import locationReducer from "./redux/Location/reducer";
import "../ReactotronConfig";
// Utilities
import { isLoggedIn } from "./utils/authUtils";
import createRootNavigator from "../routes";

const store = createStore(locationReducer, {}, applyMiddleware(ReduxThunk));

interface Props {}
export default class App extends Component<Props> {
  state = {
    loggedIn: false,
    checkedLogin: false
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

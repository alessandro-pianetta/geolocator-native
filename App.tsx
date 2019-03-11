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
// import locationReducer from "./src/redux/Location/reducer";
import "./ReactotronConfig";
// Utilities
import { isLoggedIn } from "./src/utils/authUtils";
// import createRootNavigator from "./routes";

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5FCFF"
        }}
      />
    );
  }
}

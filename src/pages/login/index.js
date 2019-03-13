import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text, AsyncStorage } from "react-native";
// import firebase from "react-native-firebase";
import validate from "../../utils/formUtils";
import Form from "../../components/Form/Form";

class LoginPage extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const {
      state: {
        params: { signUp }
      }
    } = navigation;
    return {
      title: !signUp ? "Log In" : "Sign Up",
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.setParams({ signUp: !signUp })}
        >
          <Text>{!signUp ? "Sign Up" : "Log In"}</Text>
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingRight: 20 }
    };
  };

  state = {
    validated: false,
    username: "",
    password: ""
  };

  constraints = {
    username: {
      presence: {
        message: "^Please enter an email address"
      },
      email: {
        message: "^Please enter a valid email address"
      }
    },
    password: {
      presence: {
        message: "^Please enter a password"
      },
      length: {
        minimum: 6,
        message: "^Your password must be at least 6 characters"
      }
    }
  };

  loginForm = [
    {
      labelText: "Username",
      value: this.state.username,
      placeholder: "user@name.com",
      onChangeText: input =>
        this.setState({
          username: input
        })
    },
    {
      labelText: "Password",
      value: this.state.password,
      secureTextEntry: true,
      placeholder: "********",
      onChangeText: input =>
        this.setState({
          password: input
        })
    }
  ];

  componentDidUpdate = () => {
    const { username, password } = this.state;
    this.setState({
      validated: validate({ username, password }, this.constraints)
    });
  };

  // createUser = (email, password) => {
  //   firebase
  //     .auth()
  //     .createUserAndRetrieveDataWithEmailAndPassword(email, password)
  //     .then(credential => {
  //       if (credential) {
  //         console.log("default app user ->", credential.user.toJSON());
  //         const { uid } = credential.user.toJSON();
  //         AsyncStorage.setItem("uid", uid);
  //         this.props.navigation.navigate("LoggedIn");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // signInUser = (email, password) => {
  //   firebase
  //     .auth()
  //     .signInAndRetrieveDataWithEmailAndPassword(email, password)
  //     .then(credential => {
  //       if (credential) {
  //         console.log("default app user ->", credential.user.toJSON());
  //         const { uid } = credential.user.toJSON();
  //         AsyncStorage.setItem("uid", uid);
  //         this.props.navigation.navigate("LoggedIn");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    const { validated, username, password } = this.state;
    const {
      navigation: {
        state: {
          params: { signUp }
        }
      }
    } = this.props;

    return (
      <View style={{ flex: 1, marginVertical: 35 }}>
        <Form form={this.loginForm} validations={this.constraints} />
        {
          //   signUp ? (
          //   <Button
          //     full
          //     bordered={!validated}
          //     success
          //     onPress={() => {
          //       // this.createUser(username, password);
          //     }}
          //   >
          //     <Text>Sign Up</Text>
          //   </Button>
          // ) : (
          //   <Button
          //     full
          //     bordered={!validated}
          //     primary
          //     onPress={() => {
          //       // this.signInUser(username, password);
          //     }}
          //   >
          //     <Text>Log In</Text>
          //   </Button>
          // )
        }
      </View>
    );
  }
}

export default LoginPage;

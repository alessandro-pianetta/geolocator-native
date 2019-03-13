import React, { Component } from "react";
import { View, SegmentedControlIOS, Dimensions } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import {
  formatAddress,
  convertRadius,
  addCallToHistory
} from "../../redux/Location/actions";
import GooglePlaces from "../global/GooglePlaces";
import Button from "../global/Button";
import Input from "../global/Input";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      radius: "",
      phone: "",
      sender: "",
      recipient: "",
      message: "",
      selectedIndex: 0,
      init: false
    };
  }

  handleSubmit() {
    // this.props.formatAddress(this.state.address)
    // this.props.convertRadius(this.state.radius, this.state.selectedIndex)
    this.props.addCallToHistory(
      this.state.recipient,
      this.state.message,
      this.state.phone
    );
  }

  render() {
    const { height, width } = Dimensions.get("window");
    const { phone, selectedIndex, radius, message } = this.state;

    return (
      <View style={styles.container}>
        <GooglePlaces onPress={address => this.setState({ address })} />
        <View style={styles.inputContainer}>
          <Input
            labelText="Friend's phone number"
            onChangeText={phone => this.setState({ phone })}
            value={phone}
            placeholder={"(123) 456-7890"}
            keyboardType={"phone-pad"}
          />
          <View
            style={{
              width,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 20,
              paddingHorizontal: width * 0.05
            }}
          >
            <Input
              labelText={`Distance in ${
                selectedIndex ? "kilometers" : "miles"
              } to send alert`}
              onChangeText={radius => this.setState({ radius })}
              value={radius}
              placeholder={"2"}
              keyboardType={"numeric"}
              style={{ containerStyle: { marginBottom: 0, flex: 1 } }}
            />
            <SegmentedControlIOS
              style={{ height: 20, width: 80, marginTop: 20, marginLeft: "5%" }}
              values={["mi", "km"]}
              selectedIndex={selectedIndex}
              onChange={event => {
                this.setState({
                  selectedIndex: event.nativeEvent.selectedSegmentIndex
                });
              }}
            />
          </View>
          <Input
            labelText="Custom message"
            onChangeText={message => this.setState({ message })}
            value={message}
            placeholder={"Enter custom message here"}
            multiline={true}
            numberOfLines={4}
          />

          <Button onPress={() => this.handleSubmit()} />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { formatAddress, convertRadius, addCallToHistory }
)(Form);

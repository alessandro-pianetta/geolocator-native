import React, { Component } from 'react';
import { Dimensions, SegmentedControlIOS, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import {
	addCallToHistory,
	convertRadius,
	formatAddress,
} from '../../redux/Location/actions';
import Button from '../global/Button';
import GooglePlaces from '../global/GooglePlaces';
import Input from '../global/Input';

interface Props {
	style: any;
	labelText: string;
	value: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	onChangeText(event: any): void;
	isSegmented?: boolean;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
	addCallToHistory(recipient: string, message: string, phone: string): void;
}

interface State {
	address: string;
	init: false;
	message: string;
	phone: string;
	radius: string;
	recipient: string;
	selectedIndex: 0;
	sender: string;
}

class Form extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			address: '',
			init: false,
			message: '',
			phone: '',
			radius: '',
			recipient: '',
			selectedIndex: 0,
			sender: '',
		};
	}

	handleSubmit() {
		// this.props.formatAddress(this.state.address)
		// this.props.convertRadius(this.state.radius, this.state.selectedIndex)
		this.props.addCallToHistory(
			this.state.recipient,
			this.state.message,
			this.state.phone,
		);
	}

	render() {
		const { height, width } = Dimensions.get('window');
		const { phone, selectedIndex, radius, message } = this.state;

		return (
			<View style={styles.container}>
				<GooglePlaces
					onPress={(address: string) => this.setState({ address })}
				/>
				<View style={styles.inputContainer}>
					<Input
						labelText="Friend's phone number"
						onChangeText={(phone: string) =>
							this.setState({ phone })
						}
						value={phone}
						placeholder={'(123) 456-7890'}
						keyboardType={'phone-pad'}
					/>
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-around',
							marginBottom: 20,
							paddingHorizontal: width * 0.05,
							width,
						}}
					>
						<Input
							labelText={`Distance in ${
								selectedIndex ? 'kilometers' : 'miles'
							} to send alert`}
							onChangeText={(radius: string) =>
								this.setState({ radius })
							}
							value={radius}
							placeholder={'2'}
							keyboardType={'numeric'}
							style={{
								containerStyle: { marginBottom: 0, flex: 1 },
							}}
						/>
						<SegmentedControlIOS
							style={{
								height: 20,
								marginLeft: '5%',
								marginTop: 20,
								width: 80,
							}}
							values={['mi', 'km']}
							selectedIndex={selectedIndex}
							onChange={(event: any) => {
								this.setState({
									selectedIndex:
										event.nativeEvent.selectedSegmentIndex,
								});
							}}
						/>
					</View>
					<Input
						labelText='Custom message'
						onChangeText={(message: string) =>
							this.setState({ message })
						}
						value={message}
						placeholder={'Enter custom message here'}
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
	{ formatAddress, convertRadius, addCallToHistory },
)(Form);

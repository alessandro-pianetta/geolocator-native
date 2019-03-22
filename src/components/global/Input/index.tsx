import React from 'react';
import {
	Dimensions,
	SegmentedControlIOS,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import styles from './styles';

interface Style {
	containerStyle: ViewStyle;
	labelStyle: TextStyle;
	inputStyle: TextStyle;
}

interface Props {
	labelText: string;
	value: string;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	placeholder: string;
	onChangeText(event: any): void;
	isSegmented?: boolean;
	style?: Style;
	autoCorrect?: boolean;
	keyboardType?: string;
	multiline?: boolean;
	numberOfLines?: number;
}

const Input = ({
	isSegmented = false,
	style = { containerStyle: {}, labelStyle: {}, inputStyle: {} },
	labelText,
	onChangeText,
	value,
	autoCorrect,
	autoCapitalize,
	keyboardType,
	multiline,
	numberOfLines,
	placeholder,
	secureTextEntry,
}: Props) => {
	const { containerStyle, labelStyle, inputStyle } = style;
	// const { height, width } = Dimensions.get("window");

	// if (isSegmented) {
	//   return (
	//     <View
	//       style={{
	//         width,
	//         flexDirection: "row",
	//         alignItems: "center",
	//         justifyContent: "space-around",
	//         marginBottom: 20,
	//         paddingHorizontal: width * 0.05
	//       }}
	//     >
	//       <Input
	//         labelText={`Distance in ${
	//           selectedIndex ? "kilometers" : "miles"
	//         } to send alert`}
	//         onChangeText={radius => this.setState({ radius })}
	//         value={radius}
	//         placeholder={"2"}
	//         keyboardType={"numeric"}
	//         style={{ containerStyle: { marginBottom: 0, flex: 1 } }}
	//       />
	//       <SegmentedControlIOS
	//         style={{ height: 20, width: 80, marginTop: 20, marginLeft: "5%" }}
	//         values={["mi", "km"]}
	//         selectedIndex={selectedIndex}
	//         onChange={event => {
	//           this.setState({
	//             selectedIndex: event.nativeEvent.selectedSegmentIndex
	//           });
	//         }}
	//       />
	//     </View>
	//   );
	// }

	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={[styles.label, labelStyle]}>{labelText}</Text>
			<TextInput
				style={[styles.input, inputStyle]}
				onChangeText={text => onChangeText(text)}
				value={value}
				placeholder={placeholder}
				autoCorrect={autoCorrect}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				multiline={multiline}
				numberOfLines={numberOfLines}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
};

export default Input;

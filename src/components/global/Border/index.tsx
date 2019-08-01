import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface Props {
	style?: any;
}

const Border = (props: Props) => <View style={[props.style, styles.border]} />;

export default Border;

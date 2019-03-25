import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

interface Props {}

interface State {}

class SettingsPage extends PureComponent<Props, State> {
	componentWillMount() {}

	render() {
		const {} = this.props;

		return <View style={styles.container} />;
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(
	mapStateToProps,
	null,
)(SettingsPage);

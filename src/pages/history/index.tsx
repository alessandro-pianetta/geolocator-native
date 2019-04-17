import { differenceInWeeks, format, isToday, isYesterday } from 'date-fns';
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getHistory } from '../../redux/History/actions';

import styles from './styles';

interface Props {
	history: any;
	getHistory: any;
}

interface State {}

class HistoryPage extends PureComponent<Props, State> {
	componentWillMount() {
		this.props.getHistory();
	}

	formatDate = (timestamp: string) => {
		const date = new Date(parseInt(timestamp));
		if (isToday(date)) {
			return format(date, 'h:mm A');
		} else if (isYesterday(date)) {
			return 'Yesterday';
		} else if (differenceInWeeks(Date.now(), date) < 1) {
			return format(date, 'dddd');
		} else {
			return format(date, 'M/D/YYYY');
		}
	}

	formatPhoneNumber(phoneNumber: string) {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	}
	render() {
		const { history } = this.props;

		return (
			<View style={styles.container}>
				{history.map((item: any, index: number) => (
					<View
						key={`historyItem${index}`}
						style={{
							borderBottomWidth: 1,
							borderColor: 'gray',
						}}
					>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingHorizontal: 20,
								paddingVertical: 10,
							}}
						>
							<View>
								<Text style={styles.primaryText}>
									{item.firstName}
								</Text>
								<Text style={styles.secondaryText}>
									{this.formatPhoneNumber(item.phoneNumber)}
								</Text>
							</View>
							<View>
								<Text style={styles.secondaryText}>
									{this.formatDate(item.createdAt)}
								</Text>
							</View>
							<Text style={styles.icon}>⭐️</Text>
						</TouchableOpacity>
					</View>
				))}
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({
	history: state.history.history,
});

export default connect(
	mapStateToProps,
	{ getHistory },
)(HistoryPage);

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SectionListContacts from 'react-native-sectionlist-contacts';
import { connect } from 'react-redux';
import Border from '../../components/global/Border';
import styles from './styles';

interface Props {}

interface State {}

class ContactsPage extends PureComponent<Props, State> {
	sectionList: any;
	state = {
		dataArray: [
			{ firstName: 'Fernando', name: 'Gomez' },
			{ firstName: 'Alex', name: 'Pianetta' },
			{ firstName: 'Chance', name: 'Milligan' },
			{ firstName: 'Lynne', name: 'Reine' },
			{ firstName: 'Ellie', name: 'Michalik' },
			{ firstName: 'Molly', name: 'McIntosh-Case' },
			{ firstName: 'Kamil', name: 'Hamid' },
		],
	};

	componentWillMount() {}

	renderItem = (item, index, section) => (
		<View style={{ flex: 1 }} key={`${item}${index}`}>
			<TouchableOpacity style={styles.clickable}>
				<Text>{item.firstName} </Text>
				<Text style={styles.lastName}>{item.name}</Text>
			</TouchableOpacity>
		</View>
	)

	render() {
		const {} = this.props;

		return (
			<View style={styles.container}>
				<SectionListContacts
					ref={(ref: any) => (this.sectionList = ref)}
					sectionListData={this.state.dataArray}
					initialNumToRender={
						this.state.dataArray.length > 25
							? 25
							: this.state.dataArray.length
					}
					renderItem={this.renderItem}
					otherAlphabet='#'
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(
	mapStateToProps,
	null,
)(ContactsPage);

import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';

interface Props {
	unitID: string;
}

export default class BannerAdvert extends PureComponent<Props> {
	banner: any;
	adRequest: any;
	request: any;

	componentWillMount = () => {
		this.banner = firebase.admob.Banner;
		this.adRequest = firebase.admob.AdRequest;
		this.request = new this.adRequest();
		this.request.addKeyword('foobar');
	}

	render() {
		const { width } = Dimensions.get('window');

		return (
			<View style={styles.container}>
				{/* <this.banner
					unitId={this.props.unitID}
					size={`${width}x150`}
					request={this.request.build()}
					onAdLoaded={() => {
						console.log('Advert loaded');
					}}
				/> */}
			</View>
		);
	}
}

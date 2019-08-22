import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import styles from './styles';

interface Props {
	adUnitID: string;
}

export default class BannerAdvert extends PureComponent<Props> {
	bannerErrorHandler = e => {
		console.warn(e);
	}

	render() {
		return (
			<View style={styles.container}>
				<AdMobBanner
					adSize='banner'
					adUnitID={this.props.adUnitID}
					onAdFailedToLoad={this.bannerErrorHandler}
					testDevices={[AdMobBanner.simulatorId]}
				/>
			</View>
		);
	}
}

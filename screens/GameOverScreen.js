import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Color from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={styles.imageContainer}>
					<Image
						source={require('../assets/success.png')}
						style={styles.image}
						resizeMode="cover"
						fadeDuration={300}
					/>
				</View>
				<BodyText>Number of rounds: {roundsNumber}</BodyText>
				<BodyText>Number was: {userNumber}</BodyText>
				<MainButton title="NEW GAME" onPress={onRestart} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
	imageContainer: {
		marginVertical: Dimensions.get('window').height / 40,
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: (Dimensions.get('window').width * 0.7) / 2,
		overflow: 'hidden',
		borderWidth: 10,
		borderColor: Color.accent,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

export default GameOverScreen;

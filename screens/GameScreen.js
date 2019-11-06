import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const generatRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;
	if (randomNumber === exclude) {
		return generatRandomBetween(min, max, exclude);
	} else {
		return randomNumber;
	}
};

const renderListItem = (value, numOfRound) => (
	<View key={value} style={styles.listItem}>
		<BodyText>#{numOfRound}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
	const initialGuess = generatRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setDeviceHeight(Dimensions.get('window').height);
		};

		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert('Don`t lie!', 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel ' },
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generatRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
	};

	if (deviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<BodyText style={DefaultStyles.bodyText}>Opponent`s Guess</BodyText>
				<View style={styles.controls}>
					<MainButton
						title={<Ionicons name="md-remove" size={24} color="white" />}
						onPress={nextGuessHandler.bind(this, 'lower')}
					/>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton
						title={<Ionicons name="md-add" size={24} color="white" />}
						onPress={nextGuessHandler.bind(this, 'greater')}
					/>
				</View>
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<BodyText style={DefaultStyles.bodyText}>Opponent`s Guess</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton
					title={<Ionicons name="md-remove" size={24} color="white" />}
					onPress={nextGuessHandler.bind(this, 'lower')}
				/>
				<MainButton
					title={<Ionicons name="md-add" size={24} color="white" />}
					onPress={nextGuessHandler.bind(this, 'greater')}
				/>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
		width: 300,
		maxWidth: '80%',
	},
	controls: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	listContainer: {
		flex: 1,
		width: '60%',
	},
	list: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		paddingVertical: 10,
		width: '100%',
		paddingHorizontal: 60,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default GameScreen;

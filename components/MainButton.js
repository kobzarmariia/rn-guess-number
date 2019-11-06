import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';

import Colors from '../constants/colors';

const MainButton = ({ onPress, title }) => {
	let ButtonComponent = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}
	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent onPress={onPress}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>{title}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.accent,
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 25,
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans-regular',
		fontSize: 18,
		textAlign: 'center',
	},
	buttonContainer: {
		overflow: 'hidden',
		borderRadius: 25,
	},
});

export default MainButton;

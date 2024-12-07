import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Decorative Header */}
      <View style={styles.headerCircle} />

      {/* Centered Content */}
      <View style={styles.textContainer}>
        {/* Image above main text */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
        <Text style={styles.mainText}>Manage your daily tasks</Text>
        <Text style={styles.subText}>
          Team and project management with solution-providing app
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Login')} // Added navigation logic
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#101820FF', // Dark background
    padding: 20,
  },
  headerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ED2938', // Orange gradient substitute
    position: 'absolute',
    top: -100,
    opacity: 0.4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom: 20, // Space between image and main text
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // White text
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  subText: {
    fontSize: 14,
    color: '#AAA', // Light gray text
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: '#ED2938', // Bright orange button
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    alignSelf: 'center', // Keep button centered horizontally
    marginBottom: 100, // Add margin at the bottom
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF', // White text
  },
});

export default WelcomeScreen;
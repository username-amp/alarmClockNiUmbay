import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StopwatchScreen = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);  // time in seconds
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/400x200'}} // Placeholder image
          style={styles.image}
        />
      </View>

      {/* Timer */}
      <View style={styles.clockContainer}>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>

      {/* Lap Section - Scrollable */}
      <ScrollView style={styles.lapContainer}>
        {laps.length > 0 && <Text style={styles.lapTitle}>Laps</Text>}
        {laps.map((lap, index) => (
          <View key={index} style={styles.lapItem}>
            <Text style={styles.lap}>{`Lap ${index + 1}: ${formatTime(lap)}`}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="alarm-outline" size={24} color="#888" />
          <Text style={styles.navText}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClockPage')}>
          <Icon name="time-outline" size={24} color="#888" />
          <Text style={styles.navText}>Clock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="stopwatch-outline" size={24} color="#ED2938" />
          <Text style={styles.navText}>Stopwatch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="timer-outline" size={24} color="#888" />
          <Text style={styles.navText}>Timer</Text>
        </TouchableOpacity>
      </View>

      {/* Fixed Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Icon name="refresh-circle" size={60} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={isRunning ? stopStopwatch : startStopwatch}
        >
          <Icon name={isRunning ? 'pause-circle' : 'play-circle'} size={60} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addLap}>
          <Icon name="timer-outline" size={60} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820FF',
    justifyContent: 'flex-start', // Starts layout from the top
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space below the image
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
    color: '#FFF',
    fontWeight: 'bold',
  },
  lapContainer: {
    flex: 1, // Allows the scrollable area to grow
    paddingHorizontal: 20,
    marginBottom: 100, // Ensure space for the fixed button container
  },
  lapTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lapItem: {
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  lap: {
    fontSize: 16,
    color: '#FFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 100, // Positioned above the bottom navigation
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StopwatchScreen;

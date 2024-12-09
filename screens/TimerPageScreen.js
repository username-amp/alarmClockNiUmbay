import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, ScrollView } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const TimerScreen = ({ navigation }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current; // To control the clock hand rotation
  const [ticksVisible, setTicksVisible] = useState(Array(60).fill(true)); // All ticks visible at first

  // Calculate total seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const startTimer = () => {
    setIsRunning(true);
    setIsFinished(false);
    setTicksVisible(Array(60).fill(true)); // Reset ticks visibility

    // Start the hand animation from the left to the right (counterclockwise)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: totalSeconds * 1200, // Convert seconds to milliseconds for smooth hand movement
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsFinished(true);
    animatedValue.stopAnimation();
    Vibration.vibrate(); // Trigger vibration when timer ends
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    animatedValue.setValue(0); // Reset the clock hand position
    setTicksVisible(Array(60).fill(true)); // Reset tick visibility
  };

  // Timer countdown logic
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      if (totalSeconds === 0) {
        stopTimer();
        return;
      }
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]);

  // Rotate the clock hand counterclockwise from the left
  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '450deg'], // Rotation starts from 0deg (left) and goes counterclockwise to 360deg
  });

  // Update visibility of ticks when the red line passes over them
  const updateTicksVisibility = (progress) => {
    const currentTick = Math.floor(progress * 60); // Calculate current tick based on progress (out of 60)
    setTicksVisible((prev) =>
      prev.map((_, index) => index <= currentTick ? false : true)
    );
  };

  // Listen to the progress of the animation and update ticks visibility accordingly
  useEffect(() => {
    animatedValue.addListener(({ value }) => {
      updateTicksVisibility(value);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [animatedValue]);

  // Function to generate concentric circles of dots
  const generateTicks = () => {
    const circles = [60, 60, 60]; // Dot count for each circle
    const radii = [95.5, 98, 100]; // Radius for each circle
    const ticks = [];

    circles.forEach((dotCount, circleIndex) => {
      const radius = radii[circleIndex];
      for (let i = 0; i < dotCount; i++) {
        const angle = (i * 360) / dotCount; // Angle for each dot in the circle
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        // Add each dot to the array of ticks
        ticks.push(
          <View
            key={`${circleIndex}-${i}`}
            style={[styles.tick, {
              width: circleIndex === 0 ? 4 : 4, // Adjust size based on circle index
              height: circleIndex === 0 ? 4 : 4,
              borderRadius: circleIndex === 0 ? 2.5 : 4, // Make the dots round
              transform: [{ translateX: x }, { translateY: y }],
              opacity: ticksVisible[i] ? 1 : 0, // Hide the tick if it's passed by the red line
            }]}
          />
        );
      }
    });
    return ticks;
  };

  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        {/* Clock background with concentric circles of dots */}
        <View style={styles.clockBackground}>
          {generateTicks()}
        </View>

        {/* Animated Clock Hand */}
        <Animated.View
          style={[styles.clockHand, { transform: [{ rotate: rotation }] }]}
        />

        <Text style={styles.timeDisplay}>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>

      <View style={styles.timeSetterContainer}>
        <Text style={styles.label}>Hours</Text>
        <Picker
          selectedValue={hours}
          style={styles.picker}
          onValueChange={(itemValue) => setHours(itemValue)}
        >
          {[...Array(100).keys()].map((num) => (
            <Picker.Item key={num} label={num.toString()} value={num} />
          ))}
        </Picker>
        <Text style={styles.label}>Minutes</Text>
        <Picker
          selectedValue={minutes}
          style={styles.picker}
          onValueChange={(itemValue) => setMinutes(itemValue)}
        >
          {[...Array(60).keys()].map((num) => (
            <Picker.Item key={num} label={num.toString()} value={num} />
          ))}
        </Picker>
        <Text style={styles.label}>Seconds</Text>
        <Picker
          selectedValue={seconds}
          style={styles.picker}
          onValueChange={(itemValue) => setSeconds(itemValue)}
        >
          {[...Array(60).keys()].map((num) => (
            <Picker.Item key={num} label={num.toString()} value={num} />
          ))}
        </Picker>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={isRunning ? stopTimer : startTimer}
        >
          <Text style={styles.controlButtonText}>
            {isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomePage')}>
          <Icon name="alarm-outline" size={24} color="#888" />
          <Text style={styles.navText}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClockPage')}>
          <Icon name="time-outline" size={24} color="#888" />
          <Text style={styles.navText}>Clock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('StopwatchPage')}>
          <Icon name="time-outline" size={24} color="#888" />
          <Text style={styles.navText}>Stopwatch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="stopwatch-outline" size={24} color="#ED2938" />
          <Text style={styles.navText}>Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101820FF', // Dark background
  },
  clockContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#FFF', // White border
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // White background for clock container
  },
  clockBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    position: 'absolute',
    backgroundColor: '#000', // Black dot color
  },
  clockHand: {
    position: 'absolute',
    width: 2,
    height: 90,
    backgroundColor: 'red', // Red clock hand
    top: 10,
    transformOrigin: '50% 90%',
  },
  timeDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black time text
  },
  timeSetterContainer: {
    marginTop: 20,
    width: 200,
  },
  label: {
    fontSize: 18,
    color: '#FFF', // White label text
  },
  picker: {
    height: 50,
    width: 200,
    color: '#888',
  },
  controlsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 40,
  },
  controlButton: {
    backgroundColor: '#ED2938', // Button background
    padding: 15,
    margin: 10,
    borderRadius: 5,
    flex: 1,
  },
  controlButtonText: {
    color: '#FFF', // White button text
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
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
});

export default TimerScreen;

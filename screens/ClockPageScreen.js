import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ClockPageScreen = ({ navigation, route }) => {
  const [systemTime, setSystemTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    // Function to update the current date and time
    const updateDateTime = () => {
      const now = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const formattedDate = `${dayNames[now.getDay()]}, ${now.getDate()} ${now.toLocaleString('default', { month: 'long' })}`;
      setCurrentDay(dayNames[now.getDay()]);
      setCurrentDate(formattedDate);

      const time = now.toLocaleTimeString(); // Get system time
      const timeParts = time.split(' '); // Split into time and AM/PM parts
      setSystemTime({
        time: timeParts[0], // The time part (HH:mm:ss)
        period: timeParts[1], // AM/PM part
      });
    };

    // Update time every second
    const interval = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Current Time Display */}
      <View style={styles.timeSection}>
        <Text style={styles.systemTime}>
          {systemTime.time}
          <Text style={styles.amPm}>{` ${systemTime.period}`}</Text> {/* AM/PM next to the time */}
        </Text>
      </View>

      {/* Date and Time Zone Display (Positioned below the time) */}
      <View style={styles.dateTimeZoneSection}>
        <Text style={styles.dateLabel}>{currentDate}</Text>
        <Text style={styles.timeZoneLabel}>Philippine Standard Time</Text>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        
        <TouchableOpacity
          style={[styles.navItem, route.name === 'ClockPage' && styles.activeNavItem]} // Apply active styles
          onPress={() => navigation.navigate('HomePage')} // Link to HomePageScreen
        >
          <Icon name="alarm-outline" size={24} color={route.name === 'ClockPage' ? '#888' : '#ED2938'} />
          <Text style={styles.navText}>Alarm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, route.name === 'ClockPage' && styles.activeNavItem]} // Highlight Clock Link
          onPress={() => navigation.navigate('ClockPage')} // Stay on ClockPageScreen
          >
          <Icon
            name="time-outline"
            size={24}
            color={route.name === 'ClockPage' ? '#ED2938' : '#888'} // Orange if on ClockPageScreen
          />
          <Text style={styles.navText}>Clock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('StopwatchPage')} // Navigate to StopwatchPage
        >
          <Icon name="stopwatch-outline" size={24} color="#888" />
          <Text style={styles.navText}>Stopwatch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('TimerPage')} // Navigate to StopwatchPage
        >
          <Icon name="stopwatch-outline" size={24} color="#888" />
          <Text style={styles.navText}>Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820FF',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  timeSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemTime: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    flexDirection: 'row', // Align AM/PM next to the time
  },
  amPm: {
    fontSize: 20, // Smaller font size for AM/PM
    color: '#FFF',
  },
  dateTimeZoneSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Add spacing between time and date/time zone
  },
  dateLabel: {
    fontSize: 18,
    color: '#888',
  },
  timeZoneLabel: {
    fontSize: 16,
    color: '#ED2938',
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
  activeNavItem: {
    color: '#ED2938', // Highlight active item
  },
});

export default ClockPageScreen;

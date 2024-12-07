import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons'; // For the icons in the navigation

const ClockPageScreen = ({ navigation, route }) => {
  const [systemTime, setSystemTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alarmRingtone, setAlarmRingtone] = useState('Default Alarm');
  const [timerRingtone, setTimerRingtone] = useState('Default Timer');
  const [volume, setVolume] = useState(50);
  const [autoSilence, setAutoSilence] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (route.name === 'ClockPage') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [route.name]);

  const saveSystemTime = () => {
    Alert.alert('System Time', `System time updated to: ${systemTime}`);
    setModalVisible(false);
  };

  const updateRingtone = (type) => {
    Alert.alert('Ringtone', `${type} Ringtone updated!`);
  };

  const adjustVolume = (value) => {
    setVolume(value);
    Alert.alert('Volume', `Volume set to ${value}%`);
  };

  const toggleAutoSilence = () => {
    setAutoSilence(!autoSilence);
    Alert.alert('Auto-Silence', autoSilence ? 'Disabled' : 'Enabled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clock Settings</Text>

      {/* Clock Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clock Settings</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit System Time</Text>
        </TouchableOpacity>
      </View>

      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateRingtone('Alarm')}
        >
          <Text style={styles.buttonText}>Alarm Ringtone: {alarmRingtone}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateRingtone('Timer')}
        >
          <Text style={styles.buttonText}>Timer Ringtone: {timerRingtone}</Text>
        </TouchableOpacity>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Ringtone Volume: {volume}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={volume}
            onValueChange={(value) => setVolume(value)}
            onSlidingComplete={adjustVolume}
            minimumTrackTintColor="#ED2938"
            maximumTrackTintColor="#888"
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Auto-Silence</Text>
          <Switch
            value={autoSilence}
            onValueChange={toggleAutoSilence}
            trackColor={{ false: '#888', true: '#ED2938' }}
          />
        </View>
      </View>

      {/* Additional Alarm Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Alarm Settings</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Additional Settings', 'Coming Soon!')}
        >
          <Text style={styles.buttonText}>Configure Alarm Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing System Time */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit System Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new time (e.g., 07:30 AM)"
              placeholderTextColor="#888"
              value={systemTime}
              onChangeText={setSystemTime}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={saveSystemTime} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, isActive && styles.activeNavItem]} // Apply active styles
          onPress={() => navigation.navigate('HomePageScreen')} // Link to HomePageScreen
        >
          <Icon name="alarm-outline" size={24} color={route.name === 'ClockPage' ? '#888' : (isActive ? '#ED2938' : '#888')} />
          <Text style={styles.navText}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, !isActive && styles.inactiveNavItem]} // Highlight Clock Link
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
        <TouchableOpacity style={styles.navItem}>
          <Icon name="timer-outline" size={24} color="#888" />
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
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ED2938',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabel: {
    color: '#FFF',
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    color: '#FFF',
    marginBottom: 20,
    backgroundColor: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inactiveNavItem: {
    color: '#888', // Default color for inactive items
  },
});

export default ClockPageScreen;

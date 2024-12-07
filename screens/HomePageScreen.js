import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomePageScreen = ({ navigation }) => {
  const [alarms, setAlarms] = useState([
    { id: '1', time: '5:00 AM', repeat: 'Daily', enabled: false },
    { id: '2', time: '5:15 AM', repeat: 'Once', enabled: false },
    { id: '3', time: '5:30 AM', repeat: 'Once', enabled: false },
    { id: '4', time: '6:00 AM', repeat: 'Once', enabled: true },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newRepeat, setNewRepeat] = useState('Once');
  const [newLabel, setNewLabel] = useState('');
  const [newRingtone, setNewRingtone] = useState('');

  const addAlarm = () => {
    if (newTime.trim() === '') return;
    const formattedTime = newTime.replace(/^0/, '');
    const alarm = {
      id: (alarms.length + 1).toString(),
      time: formattedTime,
      repeat: newRepeat,
      label: newLabel,
      ringtone: newRingtone,
      enabled: false,
    };
    setAlarms([...alarms, alarm]);
    setNewTime('');
    setNewRepeat('Once');
    setNewLabel('');
    setNewRingtone('');
    setModalVisible(false);
  };

  const renderAlarm = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.time}>{item.time}</Text>
        <View style={styles.repeatLabelContainer}>
          <Text style={styles.repeat}>{item.repeat}</Text>
          {item.label ? <Text style={styles.label}> - {item.label}</Text> : null}
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={item.enabled}
          onValueChange={(value) => {
            setAlarms((prevAlarms) =>
              prevAlarms.map((alarm) =>
                alarm.id === item.id ? { ...alarm, enabled: value } : alarm
              )
            );
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Placeholder for Time */}
      <View style={styles.timePlaceholder}>
        <Text style={styles.placeholderText}>10:56:55 PM</Text>
        <Text style={styles.placeholder}>Ring in 2 days 7 hours 30 minutes.</Text>
      </View>

      {/* Alarms Section */}
      <View style={styles.alarmsSection}>
        <FlatList
          data={alarms}
          renderItem={renderAlarm}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />
      </View>

      {/* FAB for Adding Alarm */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* Modal for Adding Alarm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('HomePage')}
              >
                <Icon name="alarm-outline" size={24} color="#ED2938" />
                <Text style={styles.navText}>Alarm</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Add Alarm</Text>
              <TouchableOpacity onPress={addAlarm}>
                <Icon name="checkmark" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Time (e.g., 07:30 AM)"
              placeholderTextColor="#888"
              value={newTime}
              onChangeText={setNewTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Label for Alarm"
              placeholderTextColor="#888"
              value={newLabel}
              onChangeText={setNewLabel}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat (e.g., Daily, Once)"
              placeholderTextColor="#888"
              value={newRepeat}
              onChangeText={setNewRepeat}
            />
            <TextInput
              style={styles.input}
              placeholder="Ringtone"
              placeholderTextColor="#888"
              value={newRingtone}
              onChangeText={setNewRingtone}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add" onPress={addAlarm} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="alarm-outline" size={24} color="#ED2938" />
          <Text style={styles.navText}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ClockPage')}
        >
          <Icon name="time-outline" size={24} color="#888" />
          <Text style={styles.navText}>Clock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('StopwatchPage')}
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
    paddingTop: 130,
  },
  timePlaceholder: {
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 50,
    color: '#FFF',
    paddingBottom: 5,
  },
  placeholder: {
    color: '#FFF',
  },
  alarmsSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  time: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  repeat: {
    fontSize: 14,
    color: '#888',
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 150,
    backgroundColor: '#ED2938',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    color: '#FFF',
    marginVertical: 10,
    backgroundColor: '#444',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
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

export default HomePageScreen;

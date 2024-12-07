// // AddAlarmScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Button,
//   Switch,
//   Picker,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker'; // For scrollable time picker
// import Icon from 'react-native-vector-icons/Ionicons';

// const AddAlarmScreen = ({ navigation, route }) => {
//   const { addAlarm } = route.params; // Getting addAlarm function passed from HomePageScreen
//   const [newTime, setNewTime] = useState(new Date());
//   const [newRepeat, setNewRepeat] = useState('Once');
//   const [newRingtone, setNewRingtone] = useState('Default');
//   const [newVibrate, setNewVibrate] = useState(false);

//   const saveAlarm = () => {
//     const newAlarm = {
//       id: (Math.random() * 1000).toString(), // Simple unique ID for each alarm
//       time: newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
//       repeat: newRepeat,
//       ringtone: newRingtone,
//       vibrate: newVibrate,
//       enabled: false,
//     };
//     addAlarm(newAlarm); // Adding alarm using function from HomePageScreen
//     navigation.goBack(); // Go back to HomePageScreen after adding alarm
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Set New Alarm</Text>

//       {/* Time Picker */}
//       <DateTimePicker
//         value={newTime}
//         mode="time"
//         display="spinner"
//         onChange={(event, selectedDate) => setNewTime(selectedDate || newTime)}
//       />

//       {/* Repeat Picker */}
//       <Picker
//         selectedValue={newRepeat}
//         style={styles.picker}
//         onValueChange={(itemValue) => setNewRepeat(itemValue)}
//       >
//         <Picker.Item label="Once" value="Once" />
//         <Picker.Item label="Daily" value="Daily" />
//         <Picker.Item label="Weekdays" value="Weekdays" />
//         <Picker.Item label="Weekend" value="Weekend" />
//       </Picker>

//       {/* Ringtone Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Ringtone"
//         placeholderTextColor="#888"
//         value={newRingtone}
//         onChangeText={setNewRingtone}
//       />

//       {/* Vibrate Switch */}
//       <View style={styles.switchRow}>
//         <Text style={styles.switchLabel}>Vibrate</Text>
//         <Switch
//           value={newVibrate}
//           onValueChange={setNewVibrate}
//         />
//       </View>

//       <Button title="Save Alarm" onPress={saveAlarm} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#101820FF',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     color: '#FFF',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 5,
//     padding: 10,
//     color: '#FFF',
//     marginVertical: 10,
//     backgroundColor: '#444',
//   },
//   picker: {
//     width: '100%',
//     height: 50,
//     color: '#FFF',
//     marginBottom: 10,
//   },
//   switchRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   switchLabel: {
//     fontSize: 16,
//     color: '#FFF',
//   },
// });

// export default AddAlarmScreen;

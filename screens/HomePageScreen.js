import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { rtdb } from "../firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  onValue,
} from "firebase/database";

const HomePageScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newRepeat, setNewRepeat] = useState("Once");
  const [newLabel, setNewLabel] = useState("");
  const [newRingtone, setNewRingtone] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  // show the time picker

  // Fetch alarms from Firestore
  useEffect(() => {
    const alarmsRef = ref(rtdb, "alarms");
    const unsubscribe = onValue(alarmsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedAlarms = data
        ? Object.keys(data).map((key) => {
            const alarm = data[key];
            return {
              id: key,
              time: alarm.time || {
                hours: "00",
                minutes: "00",
                moridians: "AM",
              },
              repeat: alarm.repeat || "Once",
              label: alarm.label || "",
              ringtone: alarm.ringtone || "",
              enabled: alarm.enabled || false,
            };
          })
        : [];
      setAlarms(fetchedAlarms);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Add alarm to Firestore
const addAlarm = async () => {
  if (newTime.trim() === "") return;

  // Parse the time into hours, minutes, and moridians
  const timeMatch = newTime.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!timeMatch) {
    console.error("Invalid time format. Please use the format: HH:MM AM/PM");
    return;
  }

  const hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const moridians = timeMatch[3].toUpperCase();

  // Explicitly define the structure of the alarm object
  const alarm = {
    time: {
      hours: hours,
      minutes: minutes,
      moridians: moridians,
    },
    repeat: newRepeat,
    label: newLabel,
    ringtone: newRingtone,
    enabled: false,
  };

  // Log the alarm object to verify its structure
  console.log("Alarm object to be added:", alarm);

  // Use Object.keys() to ensure that the keys are in the correct order
  const timeKeys = Object.keys(alarm.time);
  const sortedTime = {};
  timeKeys.sort((a, b) => {
    if (a === "hours") return -1;
    if (b === "hours") return 1;
    if (a === "minutes") return -1;
    if (b === "minutes") return 1;
    return 0;
  });
  timeKeys.forEach((key) => {
    sortedTime[key] = alarm.time[key];
  });
  alarm.time = sortedTime;

  try {
    const alarmsRef = ref(rtdb, "alarms");
    const newAlarmRef = push(alarmsRef);
    await set(newAlarmRef, alarm); // Push the structured alarm object to the database
    setModalVisible(false);
    setNewTime("");
    setNewRepeat("Once");
    setNewLabel("");
    setNewRingtone("");
  } catch (error) {
    console.error("Error adding alarm:", error);
  }
};


  // Update alarm status
  const toggleAlarm = async (id, enabled) => {
    try {
      const alarmRef = ref(rtdb, `alarms/${id}`);
      await update(alarmRef, { enabled });
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === id ? { ...alarm, enabled } : alarm
        )
      );
    } catch (error) {
      console.error("Error updating alarm:", error);
    }
  };

  const renderAlarm = ({ item }) => {
    const hours = item?.time?.hours || "00";
    const minutes =
      item?.time?.minutes != null
        ? item.time.minutes.toString().padStart(2, "0")
        : "00";
    const moridians = item?.time?.moridians || "AM";

    return (
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.time}>{`${hours}:${minutes} ${moridians}`}</Text>
          <View style={styles.repeatLabelContainer}>
            <Text style={styles.repeat}>{item.repeat}</Text>
            {item.label ? (
              <Text style={styles.label}> - {item.label}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={item.enabled}
            onValueChange={(value) => toggleAlarm(item.id, value)}
            trackColor={{ false: "#B0B0B0", true: "#4CAF50" }}
          />
        </View>
      </View>
    );
  };

  // Calculate remaining time for the alarm
  const calculateRemainingTime = (alarmTime) => {
    const alarmDate = new Date();
    const [time, period] = alarmTime.split(" ");

    let [hours, minutes] = time.split(":");
    if (period === "PM" && hours !== "12")
      hours = (parseInt(hours) + 12).toString();
    if (period === "AM" && hours === "12") hours = "0";

    alarmDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const remainingTime = alarmDate - currentTime;

    // If the remaining time is less than 0, it means the alarm has passed today and should trigger the next day.
    if (remainingTime <= 0) {
      alarmDate.setDate(alarmDate.getDate() + 1); // Set the alarm for the next day
    }

    const remainingMillis = alarmDate - currentTime;

    // Check if the remaining time is less than a second to trigger the alarm
    if (remainingMillis <= 1000 && remainingMillis > 0) {
      triggerAlarm(alarmTime); // Trigger the alarm when time is up
    }

    const remainingDays = Math.floor(remainingMillis / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (remainingMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (remainingMillis % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `Ring in ${remainingDays} days ${remainingHours} hours ${remainingMinutes} minutes.`;
  };

  // Trigger the alarm when the time matches
  const triggerAlarm = (alarmTime) => {
    console.log(`Alarm triggered for ${alarmTime}`);
    // You can add sound or vibration here as well
    // For now, we'll just log it as an example
  };

  return (
    <View style={styles.container}>
      <View style={styles.timePlaceholder}>
        <Text style={styles.placeholderText}>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Text>
      </View>

      <View style={styles.alarmsSection}>
        <FlatList
          data={alarms}
          renderItem={renderAlarm}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter time (e.g., 7:30 AM)"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820FF",
    paddingTop: 130,
  },
  timePlaceholder: {
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 50,
    color: "#FFF",
    paddingBottom: 5,
  },
  remainingTime: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 5,
  },
  alarmsSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 15,
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  time: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
  },
  repeatLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  repeat: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  label: {
    fontSize: 14,
    color: "#B0B0B0",
    marginLeft: 5,
  },
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 150,
    backgroundColor: "#ED2938",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    padding: 10,
    color: "#FFF",
    marginVertical: 10,
    backgroundColor: "#444",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomePageScreen;

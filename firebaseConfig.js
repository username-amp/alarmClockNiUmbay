import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3c6PZ-kTRXmQwF1bM3UIk5JUwR-zE2vg",
  authDomain: "fir-integration-3613c.firebaseapp.com",
  databaseUrl: "https://fir-integration-3613c-default-rtdb.firebaseio.com",
  projectId: "fir-integration-3613c",
  storageBucket: "fir-integration-3613c.firebasestorage.app",
  messagingSenderId: "191701394662",
  appId: "1:191701394662:web:a256a5f2c4ae68904a4727",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db, rtdb };

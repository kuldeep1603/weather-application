import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA0gIpS_95EyZ4k_YHxt78chT6FPk-QISk",
  authDomain: "weather-app-bb006.firebaseapp.com",
  projectId: "weather-app-bb006",
  storageBucket: "weather-app-bb006.firebasestorage.app",
  messagingSenderId: "1061173351030",
  appId: "1:1061173351030:web:b2ff4db982b2fc3f930557",
  databaseURL:"https://weather-app-bb006-default-rtdb.firebaseio.com",
};


export const app = initializeApp(firebaseConfig);
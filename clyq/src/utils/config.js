import Constants from "expo-constants";
import { Platform } from "react-native";

const getLocalHost = () => {
    if (Constants.expoConfig?.hostUri) {
        return `http://${Constants.expoConfig.hostUri.split(":").shift()}:4000`;
    }
    // Fallback for Android Emulator
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:4000';
    }
    // Fallback for iOS Simulator
    return 'http://localhost:4000';
};

export const API_BASE_URL = getLocalHost();

export const endpoints = {
    trending: `${API_BASE_URL}/api/events/trending`,
    upcoming: `${API_BASE_URL}/api/events/upcoming`,
    posts: `${API_BASE_URL}/api/posts`,
};

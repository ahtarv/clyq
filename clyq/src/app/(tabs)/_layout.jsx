import { Tabs } from "expo-router";
import { Home, Search, QrCode } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          left: 20,
          right: 20,
          height: 56,
          borderRadius: 28,
          backgroundColor:
            Platform.OS === "ios" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.4)",
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          paddingBottom: 0,
          paddingTop: 0,
          overflow: "hidden",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 32,
            },
            android: {
              elevation: 12,
            },
          }),
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <View style={{ flex: 1, overflow: "hidden", borderRadius: 28 }}>
              <BlurView
                intensity={100}
                tint="dark"
                style={StyleSheet.absoluteFill}
                experimentalBlurMethod="dimezisBlurView"
              />
              {/* Inner subtle highlight for glass depth */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 28,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: 28,
              }}
            >
              {/* Inner border for Android */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 28,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
              />
            </View>
          ),
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#52525b",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) => <Search color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          tabBarIcon: ({ color, size }) => <QrCode color={color} size={26} />,
        }}
      />
    </Tabs>
  );
}

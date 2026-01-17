import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RefreshCw } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { Image } from "expo-image";

export default function QRScreen() {
  const insets = useSafeAreaInsets();
  const [userType, setUserType] = useState("STUDENT");
  const [isSyncing, setIsSyncing] = useState(true);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const qrScale = useRef(new Animated.Value(0.9)).current;
  const syncRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate QR code entrance
    Animated.spring(qrScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Sync animation
    const syncInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(syncRotation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(syncRotation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    const syncTimer = setTimeout(() => {
      setIsSyncing(false);
    }, 3000);

    return () => {
      clearInterval(syncInterval);
      clearTimeout(syncTimer);
    };
  }, []);

  const switchUserType = (type) => {
    const toValue = type === "STUDENT" ? 0 : 1;
    Animated.spring(slideAnim, {
      toValue,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
    setUserType(type);
  };

  const spin = syncRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Toggle Switch */}
        <View style={{ paddingHorizontal: 24, marginBottom: 60 }}>
          <View
            style={{
              backgroundColor: "#0a0a0a",
              borderRadius: 28,
              padding: 4,
              flexDirection: "row",
              position: "relative",
              borderWidth: 1,
              borderColor: "#1a1a1a",
            }}
          >
            <Animated.View
              style={{
                position: "absolute",
                top: 4,
                left: 4,
                width: "48.5%",
                height: 48,
                backgroundColor: "#fff",
                borderRadius: 24,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 180],
                    }),
                  },
                ],
              }}
            />
            <TouchableOpacity
              onPress={() => switchUserType("STUDENT")}
              activeOpacity={0.8}
              style={{
                flex: 1,
                paddingVertical: 14,
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: userType === "STUDENT" ? "#000" : "#666",
                  letterSpacing: 0.5,
                }}
              >
                STUDENT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => switchUserType("TEACHER")}
              activeOpacity={0.8}
              style={{
                flex: 1,
                paddingVertical: 14,
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: userType === "TEACHER" ? "#000" : "#666",
                  letterSpacing: 0.5,
                }}
              >
                TEACHER
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Code Card */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Animated.View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 32,
              alignItems: "center",
              transform: [{ scale: qrScale }],
            }}
          >
            {/* QR Code */}
            <View
              style={{
                width: 280,
                height: 280,
                backgroundColor: "#fff",
                borderRadius: 16,
                marginBottom: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Placeholder QR - In production, generate actual QR code */}
              <View
                style={{
                  width: 260,
                  height: 260,
                  backgroundColor: "#000",
                  borderRadius: 8,
                }}
              >
                {/* QR Pattern simulation */}
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {[...Array(100)].map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: "10%",
                        aspectRatio: 1,
                        backgroundColor: Math.random() > 0.5 ? "#000" : "#fff",
                      }}
                    />
                  ))}
                </View>
                {/* Corner markers */}
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    width: 40,
                    height: 40,
                    borderWidth: 4,
                    borderColor: "#000",
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={{ flex: 1, margin: 6, backgroundColor: "#000" }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 40,
                    height: 40,
                    borderWidth: 4,
                    borderColor: "#000",
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={{ flex: 1, margin: 6, backgroundColor: "#000" }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    width: 40,
                    height: 40,
                    borderWidth: 4,
                    borderColor: "#000",
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={{ flex: 1, margin: 6, backgroundColor: "#000" }}
                  />
                </View>
              </View>
            </View>

            {/* User Info */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#000",
                marginBottom: 4,
                letterSpacing: -0.5,
              }}
            >
              ALEX CHEN
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#999",
                marginBottom: 32,
                letterSpacing: 2,
              }}
            >
              21BCE1045
            </Text>

            {/* ID and Status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#999" }}>
                ID: 500082931
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <RefreshCw
                    color={isSyncing ? "#666" : "#22c55e"}
                    size={16}
                    strokeWidth={2.5}
                  />
                </Animated.View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: isSyncing ? "#666" : "#22c55e",
                    letterSpacing: 0.5,
                  }}
                >
                  {isSyncing ? "SYNCING" : "SYNCED"}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Bottom Text */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#444",
              textAlign: "center",
              marginTop: 40,
              letterSpacing: 2,
            }}
          >
            SCAN TO MARK ATTENDANCE
          </Text>
        </View>
      </View>
    </View>
  );
}

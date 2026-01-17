import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect, useCallback } from "react";
import { endpoints } from "../../utils/config";
import { useFocusEffect } from "expo-router";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

// Generate calendar days for January 2026
const generateCalendarDays = () => {
  const days = [];
  // January 2026 starts on Thursday (day 4)
  // Add empty spaces for alignment
  for (let i = 0; i < 4; i++) {
    days.push(null);
  }
  // Add all days of January (31 days)
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
};

const calendarDays = generateCalendarDays();
const eventDays = [18, 21]; // Days with events
const currentDay = 16;

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(endpoints.posts);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  // Animation values for each day
  const dayAnimations = useRef(
    calendarDays.map(() => new Animated.Value(1)),
  ).current;

  const animateDay = (index, toValue) => {
    Animated.spring(dayAnimations[index], {
      toValue,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 48,
                fontWeight: "300",
                color: "#fff",
                letterSpacing: -1,
              }}
            >
              Calendar
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.6}
              >
                <ChevronLeft color="#666" size={28} strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.6}
              >
                <ChevronRight color="#666" size={28} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "#666",
              letterSpacing: 2,
              marginBottom: 32,
            }}
          >
            JANUARY 2026
          </Text>
        </View>

        {/* Calendar Grid */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Day headers */}
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "500", color: "#666" }}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar days */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {calendarDays.map((day, index) => {
              const isCurrentDay = day === currentDay;
              const hasEvent = day && eventDays.includes(day);
              const row = Math.floor(index / 7);

              return (
                <View
                  key={index}
                  style={{
                    width: `${100 / 7}%`,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: row < 5 ? 8 : 0,
                  }}
                >
                  {day && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPressIn={() => animateDay(index, 0.85)}
                      onPressOut={() => animateDay(index, 1)}
                      onPress={() => setSelectedDay(day)}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Animated.View
                        style={{
                          transform: [{ scale: dayAnimations[index] }],
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            backgroundColor: isCurrentDay
                              ? "#fff"
                              : "transparent",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "400",
                              color: isCurrentDay ? "#000" : "#fff",
                            }}
                          >
                            {day}
                          </Text>
                        </View>
                        {hasEvent && (
                          <View
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: "#fff",
                              marginTop: 4,
                            }}
                          />
                        )}
                      </Animated.View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Upcoming Section */}
        <View style={{ marginTop: 48, paddingHorizontal: 24 }}>
          {/* Community Posts */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#666",
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            COMMUNITY POSTS
          </Text>

          {posts.map((post) => (
            <View
              key={post.id}
              style={{
                backgroundColor: "#111",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "#222"
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>{post.author}</Text>
                <Text style={{ color: "#666", fontSize: 12 }}>{new Date(post.timestamp).toLocaleDateString()}</Text>
              </View>
              <Text style={{ color: "#ccc", fontSize: 16, lineHeight: 24 }}>{post.content}</Text>
              <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#4ADE80", fontSize: 12 }}>{post.likes} likes</Text>
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
}

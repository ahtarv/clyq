import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, TrendingUp, ArrowUpRight } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect, useMemo } from "react";
import { endpoints, API_BASE_URL } from "../../utils/config";
import { ActivityIndicator } from "react-native";

const filterTabs = ["ALL", "TODAY", "THIS WEEK", "HACKATHONS"];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState("checking"); // checking, online, offline

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setIsLoading(true);
    setServerStatus("checking");

    try {
      // 1. Check basic health
      const healthRes = await fetch(API_BASE_URL);
      if (healthRes.ok) {
        setServerStatus("online");
      } else {
        setServerStatus("offline");
      }

      // 2. Fetch Data
      const [trendingRes, upcomingRes] = await Promise.all([
        fetch(endpoints.trending),
        fetch(endpoints.upcoming)
      ]);

      if (trendingRes.ok && upcomingRes.ok) {
        const trendingData = await trendingRes.json();
        const upcomingData = await upcomingRes.json();
        setTrendingEvents(trendingData);
        setUpcomingEvents(upcomingData);
      }
    } catch (error) {
      console.error("Backend Error:", error);
      setServerStatus("offline");
    } finally {
      setIsLoading(false);
    }
  };

  const cardScales = useMemo(
    () => trendingEvents.map(() => new Animated.Value(1)),
    [trendingEvents]
  );
  const eventScales = useMemo(
    () => upcomingEvents.map(() => new Animated.Value(1)),
    [upcomingEvents]
  );

  const animateCard = (index, toValue) => {
    Animated.spring(cardScales[index], {
      toValue,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  const animateEvent = (index, toValue) => {
    Animated.spring(eventScales[index], {
      toValue,
      useNativeDriver: true,
      friction: 6,
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
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: "300",
                  color: "#fff",
                  letterSpacing: -1,
                }}
              >
                Explore
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: serverStatus === 'online' ? '#4ADE80' : serverStatus === 'offline' ? '#EF4444' : '#EAB308',
                  marginRight: 6
                }} />
                <Text style={{ color: '#888', fontSize: 12 }}>
                  {serverStatus === 'online' ? 'Backend Connected' : serverStatus === 'offline' ? 'Backend Offline' : 'Connecting...'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                borderWidth: 1,
                borderColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
              activeOpacity={0.7}
              onPress={checkBackendStatus}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Search color="#fff" size={24} strokeWidth={1.5} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Section */}
        <View style={{ marginBottom: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 24,
              marginBottom: 20,
            }}
          >
            <TrendingUp color="#fff" size={16} strokeWidth={2} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#fff",
                letterSpacing: 1.5,
                marginLeft: 8,
              }}
            >
              TRENDING
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            style={{ flexGrow: 0 }}
          >
            {trendingEvents.map((event, index) => (
              <TouchableOpacity
                key={event.id}
                activeOpacity={0.9}
                onPressIn={() => animateCard(index, 0.95)}
                onPressOut={() => animateCard(index, 1)}
              >
                <Animated.View
                  style={{
                    width: 320,
                    height: 240,
                    backgroundColor: "#111",
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: "flex-end",
                    borderWidth: 1,
                    borderColor: "#1a1a1a",
                    transform: [{ scale: cardScales[index] }],
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: "#888",
                      letterSpacing: 1.5,
                      marginBottom: 8,
                    }}
                  >
                    {event.category}
                  </Text>
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: "600",
                      color: "#fff",
                      marginBottom: 16,
                      letterSpacing: -0.5,
                    }}
                  >
                    {event.title}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    {event.tags.map((tag, tagIndex) => (
                      <View
                        key={tagIndex}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: "#333",
                          backgroundColor: "#0a0a0a",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#999",
                          }}
                        >
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 12,
            marginBottom: 32,
          }}
          style={{ flexGrow: 0 }}
        >
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedFilter(tab)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 14,
                    borderRadius: 8,
                    backgroundColor: isSelected ? "#fff" : "transparent",
                    borderWidth: 1,
                    borderColor: isSelected ? "#fff" : "#333",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: isSelected ? "#000" : "#888",
                      letterSpacing: 0.5,
                    }}
                  >
                    {tab}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Upcoming Events List */}
        <View style={{ paddingHorizontal: 24 }}>
          {upcomingEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              activeOpacity={0.9}
              onPressIn={() => animateEvent(index, 0.97)}
              onPressOut={() => animateEvent(index, 1)}
            >
              <Animated.View
                style={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#1a1a1a",
                  transform: [{ scale: eventScales[index] }],
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "500", color: "#666" }}
                  >
                    {event.date}
                  </Text>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#111",
                      borderWidth: 1,
                      borderColor: "#222",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowUpRight color="#666" size={20} strokeWidth={2} />
                  </View>
                </View>
                {event.title.includes("HackOverflow") && (
                  <Image
                    source={require("../../../assets/images/hackathon.png")}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 12,
                      marginBottom: 16,
                    }}
                    contentFit="cover"
                  />
                )}

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: 8,
                    letterSpacing: -0.5,
                  }}
                >
                  {event.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#888",
                    marginBottom: 12,
                    lineHeight: 20,
                  }}
                >
                  {event.description}
                </Text>
                <Text
                  style={{ fontSize: 13, fontWeight: "500", color: "#666" }}
                >
                  {event.attending} attending
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

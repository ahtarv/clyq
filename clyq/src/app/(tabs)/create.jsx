import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useRouter } from "expo-router";
import { X, Send } from "lucide-react-native";
import { endpoints } from "../../utils/config";

export default function CreateScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const handlePost = async () => {
        if (!content.trim()) return;

        setIsPosting(true);
        try {
            const res = await fetch(endpoints.posts, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            if (res.ok) {
                setContent("");
                Alert.alert("Success", "Post created successfully!");
                // Navigate back to home/feed to see the post (assuming Home fetches fresh data)
                router.push("/(tabs)");
            } else {
                Alert.alert("Error", "Failed to create post");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not connect to server");
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#000", paddingTop: insets.top }}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#1a1a1a"
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <X color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>New Post</Text>
                <TouchableOpacity
                    onPress={handlePost}
                    disabled={!content.trim() || isPosting}
                    style={{ opacity: content.trim() ? 1 : 0.5 }}
                >
                    {isPosting ? <ActivityIndicator color="#fff" size="small" /> : <Text style={{ color: "#4ADE80", fontWeight: "700", fontSize: 16 }}>Post</Text>}
                </TouchableOpacity>
            </View>

            {/* Input Area */}
            <View style={{ flex: 1, padding: 20 }}>
                <TextInput
                    multiline
                    autoFocus
                    placeholder="What's happening?"
                    placeholderTextColor="#666"
                    style={{
                        color: "#fff",
                        fontSize: 18,
                        lineHeight: 28,
                        textAlignVertical: "top",
                        minHeight: 150
                    }}
                    value={content}
                    onChangeText={setContent}
                />
            </View>

            {/* Toolbar (Placeholder for future features like adding images) */}
            <View style={{
                padding: 20,
                paddingBottom: insets.bottom + 20,
                flexDirection: 'row',
                gap: 20,
                borderTopWidth: 1,
                borderTopColor: '#1a1a1a'
            }}>
                {/* Add icons here later */}
            </View>
        </View>
    );
}

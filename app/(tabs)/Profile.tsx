import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image, Animated, StyleSheet } from "react-native";
import { useAppSelector } from "@/hooks/useAppSelector";
import { themes } from "@/hooks/themeSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type ProfileImageType = string | null;

export default function Profile() {
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const themeColors = themes[currentTheme] || themes.default;
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<ProfileImageType>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 3,
    }).start();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <View style={[styles.header, { backgroundColor: themeColors.primary }]}> 
        <Text style={[styles.headerText, { color: themeColors.buttonText }]}>Profile</Text>
      </View>
      <Animated.View style={[styles.avatarContainer, { transform: [{ scale: scaleAnim }] }]}> 
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
          <Image
            source={profileImage ? { uri: profileImage } : require("@/assets/avatar.png")}
            style={[styles.avatar, { borderColor: themeColors.primary }]}
          />
          <View style={[styles.cameraIconContainer, { backgroundColor: themeColors.primary }]}> 
            <Ionicons name="camera-outline" size={22} color={themeColors.buttonText} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View style={[styles.infoContainer, { backgroundColor: themeColors.card }]}> 
        <Text style={[styles.name, { color: themeColors.text }]}>Nishant Garg</Text>
        <Text style={[styles.subtitle, { color: themeColors.secondaryText }]}>Minimalist | Maker</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: themeColors.primary }]}>24</Text>
            <Text style={[styles.statLabel, { color: themeColors.secondaryText }]}>Tasks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: themeColors.primary }]}>6</Text>
            <Text style={[styles.statLabel, { color: themeColors.secondaryText }]}>Themes</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.primary }]}>
          <Text style={[styles.actionButtonText, { color: themeColors.buttonText }]}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.primary }]}>
          <Text style={[styles.actionButtonText, { color: themeColors.buttonText }]}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: themeColors.accent }]}
          onPress={() => router.push("/Themes")}
        >
          <Ionicons name="color-palette-outline" size={18} color={themeColors.text} />
          <Text style={[styles.themeButtonText, { color: themeColors.text }]}>Change Theme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  header: {
    width: "100%",
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
    elevation: 2,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  avatarContainer: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 3,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    padding: 5,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  infoContainer: {
    width: "90%",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    elevation: 2,
    marginTop: 10,
    marginBottom: 18,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    marginBottom: 18,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: "#888",
  },
  actionButton: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 8,
    elevation: 1,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 6,
  },
});

import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Index() {
  console.log(EXPO_PUBLIC_BACKEND_URL, "EXPO_PUBLIC_BACKEND_URL");

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Ayumi</Text>
          <Text style={styles.appSubtitle}>あゆみ - Walking with God</Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <Link href="/bible" asChild>
            <TouchableOpacity style={styles.featureCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="book" size={32} color="#2563EB" />
              </View>
              <Text style={styles.featureTitle}>Bible Reader</Text>
              <Text style={styles.featureDescription}>
                120+ versions, highlights, fonts
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={[styles.featureCard, styles.featureCardDisabled]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
              <Ionicons name="musical-notes" size={32} color="#6366F1" />
            </View>
            <Text style={styles.featureTitle}>Worship Music</Text>
            <Text style={styles.featureDescription}>
              Coming soon
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.featureCard, styles.featureCardDisabled]}>
            <View style={[styles.iconContainer, { backgroundColor: '#FED7E2' }]}>
              <Ionicons name="create" size={32} color="#EC4899" />
            </View>
            <Text style={styles.featureTitle}>Journal</Text>
            <Text style={styles.featureDescription}>
              Coming soon
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.featureCard, styles.featureCardDisabled]}>
            <View style={[styles.iconContainer, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="image" size={32} color="#10B981" />
            </View>
            <Text style={styles.featureTitle}>Verse Images</Text>
            <Text style={styles.featureDescription}>
              Coming soon
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Powered by Claude Sonnet</Text>
          <Text style={styles.infoText}>
            AI-powered Bible study, devotionals, and spiritual growth tools
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureCardDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
});

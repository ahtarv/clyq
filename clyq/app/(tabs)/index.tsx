import { StyleSheet, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'dark';
  const colors = Colors[theme];

  const ActionCard = ({ title, icon, color }: { title: string; icon: string; color: string }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.tint,
        },
      ]}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <IconSymbol name={icon as any} size={30} color={color} />
      </View>
      <ThemedText type="subtitle" style={{ marginTop: 12, fontSize: 16 }}>{title}</ThemedText>
      <ThemedText style={{ opacity: 0.6, fontSize: 12, marginTop: 4 }}>Tap to access</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <ThemedText type="title" style={styles.greeting}>Welcome Back</ThemedText>
              <ThemedText style={styles.subGreeting}>System Online • {theme.toUpperCase()} MODE</ThemedText>
            </View>
            <View style={[styles.avatar, { borderColor: colors.tint }]}>
              <IconSymbol name="person.fill" size={24} color={colors.background} />
            </View>
          </View>

          {/* Main Status Card */}
          <View style={[
            styles.statusCard,
            { backgroundColor: colors.card, shadowColor: colors.tint }
          ]}>
            <View style={styles.statusHeader}>
              <ThemedText type="subtitle">System Health</ThemedText>
              <View style={[styles.badge, { backgroundColor: colors.tint }]}>
                <ThemedText style={{ color: colors.background, fontWeight: 'bold', fontSize: 10 }}>OPTIMAL</ThemedText>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View>
                <ThemedText style={styles.statLabel}>CPU Usage</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>12%</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.statLabel}>Memory</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>2.4 GB</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.statLabel}>Network</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>50 ms</ThemedText>
              </View>
            </View>
          </View>

          {/* Quick Actions Grid */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.grid}>
            <ActionCard title="Deploy" icon="rocket.fill" color="#FF3B30" />
            <ActionCard title="Analytics" icon="chart.bar.fill" color="#30D158" />
            <ActionCard title="Database" icon="square.stack.3d.up.fill" color="#0A84FF" />
            <ActionCard title="Settings" icon="gear" color="#FF9F0A" />
          </View>

          <View style={[styles.promotionCard, { borderColor: colors.tint }]}>
            <IconSymbol name="sparkles" size={24} color={colors.tint} />
            <ThemedText style={{ marginLeft: 10, color: colors.tint }}>Pro Features Unlocked</ThemedText>
          </View>

          {/* Bottom Spacer for TabBar */}
          <View style={{ height: 100 }} />

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800', // Extra bold for futuristic look
    letterSpacing: 0.5,
  },
  subGreeting: {
    opacity: 0.6,
    marginTop: 4,
    fontSize: 13,
    letterSpacing: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  statusCard: {
    borderRadius: 30,
    padding: 24,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 20,
    elevation: 10,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    opacity: 0.5,
    fontSize: 12,
    marginBottom: 4,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%', // Slightly less than 50% to account for gap
    padding: 20,
    borderRadius: 26,
    marginBottom: 0, // Gap handles vertical spacing if we wrapped differently, but here we might need margin if row wraps
    aspectRatio: 1,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionCard: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.8,
  }
});

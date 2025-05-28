import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { useMemo } from "react";

const services = [
  "Hard Drive Recovery",
  "Server Data Recovery",
  "DVR/CCTV Data Recovery",
  "SSD Data Recovery",
  "Database Data Recovery",
  "Apple Data Recovery",
  "External Hard Drive Recovery",
  "RAID Data Recovery",
  "QuickBooks Data Recovery",
  "Flash Drive Recovery",
  "SAN Data Recovery",
  "Linux Data Recovery",
  "Laptop Data Recovery",
  "NAS Data Recovery",
  "CF Card Recovery",
  "Desktop Data Recovery",
  "Tape Data Recovery",
  "Windows Data Recovery",
  "Synology Data Recovery",
  "Monolith Data Recovery",
  "SD Card Data Recovery",
];

export default function ServicesScreen() {
  const { width } = useWindowDimensions();

  const itemWidth = useMemo(() => {
    if (width >= 1024) return "31%";
    if (width >= 640) return "48%";
    return "100%";
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Services We Offer</Text>
          <Text style={styles.description}>
            At PITS Global Data Recovery Services, we provide professional recovery solutions for a wide variety of
            devices and storage media.
          </Text>

          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={[styles.serviceItem, { width: itemWidth }]}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#54595F",
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 400,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    columnGap: 12,
  },
  serviceItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
});

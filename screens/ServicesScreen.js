import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"

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
]

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Services We Offer</Text>
          <Text style={styles.description}>
            At PITS Global Data Recovery Services, we provide professional recovery solutions for a wide variety of
            devices and storage media.
          </Text>

          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
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
    gap: 16,
  },
  serviceItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
})

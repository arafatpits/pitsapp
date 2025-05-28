import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>

        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.text}>
          Founded in 2020, we started with a simple mission: to provide exceptional service that exceeds our customers'
          expectations. Over the years, we've grown from a small startup to a trusted name in the industry.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          To deliver innovative solutions that help our clients achieve their goals while maintaining the highest
          standards of quality and integrity.
        </Text>

        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesList}>
          <Text style={styles.valueItem}>• Excellence in everything we do</Text>
          <Text style={styles.valueItem}>• Integrity and transparency</Text>
          <Text style={styles.valueItem}>• Customer-first approach</Text>
          <Text style={styles.valueItem}>• Continuous innovation</Text>
          <Text style={styles.valueItem}>• Team collaboration</Text>
        </View>

        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.text}>
          With years of experience and a proven track record, we understand what it takes to deliver results. Our team
          of experts is committed to providing personalized solutions that meet your unique needs.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 25,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 15,
  },
  valuesList: {
    marginBottom: 15,
  },
  valueItem: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 5,
  },
})

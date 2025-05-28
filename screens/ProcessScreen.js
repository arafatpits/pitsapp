import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { useMemo } from "react";

const processSteps = [
  {
    number: 1,
    title: "Initial Assessment",
    description:
      "We begin with a free consultation to discuss your data loss scenario. Our specialists will outline the evaluation process, ensuring you fully understand each step before proceeding.",
  },
  {
    number: 2,
    title: "Device Shipment & Evaluation",
    description:
      "Once you decide to move forward, we provide a prepaid, insured shipping label for the secure transport of your device. Upon receipt, our engineers conduct a comprehensive diagnostic to identify the underlying issues. This thorough analysis allows us to tailor a recovery strategy specific to your situation.",
  },
  {
    number: 3,
    title: "Quote & Recovery Options",
    description:
      "After the evaluation, we provide a precise quote. Pricing is based on the extent of the damage, recovery complexity, and required turnaround time. If you choose to proceed, we initiate the recovery process. If not, your media is promptly returned without further obligation.",
  },
  {
    number: 4,
    title: "Secure Delivery & Guarantee",
    description:
      "Upon successful data recovery, your files are transferred to a new encrypted drive. The drive is then securely shipped back to you, preserving data integrity and ensuring you retain full control and peace of mind throughout the process.",
  },
];

export default function ProcessScreen() {
  const { width } = useWindowDimensions();

  const itemWidth = useMemo(() => {
    if (width >= 1280) return "23%";
    if (width >= 768) return "48%";
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
          <Text style={styles.title}>Our Data Recovery Process</Text>
          <Text style={styles.description}>
            Understanding our streamlined approach to data recovery helps ensure a smooth and transparent experience
            from start to finish.
          </Text>

          <View style={styles.stepsContainer}>
            {processSteps.map((step, index) => (
              <View key={index} style={[styles.stepCard, { width: itemWidth }]}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
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
  stepsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
    columnGap: 16,
  },
  stepCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepNumber: {
    backgroundColor: "#d93927",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  stepNumberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: "#54595F",
    lineHeight: 20,
  },
});

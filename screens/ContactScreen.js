import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, SafeAreaView } from "react-native"

export default function ContactScreen() {
  const phoneNumber = "(888) 611-0737"
  const emailAddress = "info@pitsdatarecovery.com"
  const websiteUrl = "https://www.pitsdatarecovery.com/"
  const requestHelpUrl = "https://www.pitsdatarecovery.com/request-help/"

  const contactItems = [
    {
      iconSrc: require("../assets/icons/contact.png"),
      label: "Call Us",
      value: phoneNumber,
      onPress: () => Linking.openURL(`tel:+18886110737`),
      ariaLabel: `Call PITS Global Data Recovery at ${phoneNumber}`,
    },
    {
      iconSrc: require("../assets/icons/mail.png"),
      label: "Email Us",
      value: emailAddress,
      onPress: () => Linking.openURL(`mailto:${emailAddress}`),
      ariaLabel: `Email PITS Global Data Recovery at ${emailAddress}`,
    },
    {
      iconSrc: require("../assets/icons/web.png"),
      label: "Visit Our Website",
      value: "www.pitsdatarecovery.com",
      onPress: () => Linking.openURL(websiteUrl),
      ariaLabel: "Visit the PITS Global Data Recovery website",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.description}>
            We're here to help you with your data recovery needs. Reach out to us through any of the channels below, or
            start your recovery process directly.
          </Text>

          <View style={styles.contactCard}>
            {contactItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.contactItem} onPress={item.onPress} activeOpacity={0.7}>
                <View style={styles.iconContainer}>
                  <Image source={item.iconSrc} style={styles.contactIconBase} tintColor="white" resizeMode="contain" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>{item.label}</Text>
                  <Text style={styles.contactValue}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => Linking.openURL(requestHelpUrl)}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaButtonText}>Start Your Data Recovery</Text>
            </TouchableOpacity>
            <Text style={styles.ctaDescription}>
              Initiate your data recovery by securely submitting your case details via the button above. Our specialists
              are ready to assist you.
            </Text>
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
  contactCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 4,
    marginBottom: 40,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: "#d93927",
    borderRadius: 20,
    width: 40,
    height: 40,
    padding: 8,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  contactIconBase: {
    width: 20,
    height: 20,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#54595F",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#d93927",
  },
  ctaContainer: {
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: "#d93927",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 16,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  ctaDescription: {
    fontSize: 14,
    color: "#54595F",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },
})

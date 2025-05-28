import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { router } from "expo-router"

const cardItemsList = [
  { title: "Our Services", route: "services", icon: require("../assets/icons/services.png") },
  { title: "Our Process", route: "process", icon: require("../assets/icons/process.png") },
  { title: "Customer Reviews", route: "reviews", icon: require("../assets/icons/reviews.png") },
  { title: "Locations", route: "locations", icon: require("../assets/icons/locations.png") },
  { title: "Contact Us", route: "contact", icon: require("../assets/icons/contact.png") },
]

function Card({ title, icon, route }) {
  const handlePress = () => {
    try {
      if (route && typeof route === "string") {
        router.push(route)
      }
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.cardIconBase} tintColor="white" resizeMode="contain" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.mainTitle}>PITS Global Data Recovery Services</Text>
          <Text style={styles.subtitle}>
            Your trusted experts for secure, fast, and reliable data recovery solutions. We're here to bring your lost
            data back.
          </Text>
        </View>

        <View style={styles.main}>
          <View style={styles.cardsGrid}>
            {cardItemsList.map((cardData, i) => (
              <Card key={i} title={cardData.title} icon={cardData.icon} route={cardData.route} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerQuestion}>Questions or ready to start a recovery?</Text>
        <TouchableOpacity
          onPress={() => {
            try {
              router.push("contact")
            } catch (error) {
              console.error("Navigation error:", error)
            }
          }}
        >
          <Text style={styles.footerLink}>Contact Our Experts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#d93927",
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: "#54595F",
    lineHeight: 24,
    maxWidth: 320,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 600,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    width: "48%",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#d93927",
    borderRadius: 32,
    width: 64,
    height: 64,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconBase: {
    width: "100%",
    height: "100%",
  },
  cardTitle: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  footer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  footerQuestion: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: "#d93927",
    fontWeight: "600",
  },
})

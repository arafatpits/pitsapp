import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import locationsData from "../data/locations.json";

export default function LocationsScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    if (width >= 1280) return "31%";
    if (width >= 768) return "48%";
    return "100%";
  }, [width]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setTimeout(() => {
          setLocations(locationsData);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to load locations:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading locations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>Our Locations</Text>
          <Text style={styles.description}>
            We offer comprehensive data recovery services across all 50 US states, with convenient drop-off points and
            mail-in options available.
          </Text>

          {locations.length > 0 && (
            <View style={styles.locationsContainer}>
              {locations.map((location, index) => (
                <View key={index} style={[styles.locationCard, { width: cardWidth }]}>
                  <View style={styles.locationHeader}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require("../assets/icons/locations.png")}
                        style={styles.locationIconBase}
                        tintColor="white"
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.locationName}>{location.name}</Text>
                  </View>
                  <View style={styles.addressContainer}>
                    <Text style={styles.addressLabel}>Address:</Text>
                    <Text style={styles.addressText}>
                      {location.address || `${location.street}, ${location.city}, ${location.state} ${location.zip}`}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  locationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
    columnGap: 16,
  },
  locationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#d93927",
    borderRadius: 16,
    width: 32,
    height: 32,
    padding: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIconBase: {
    width: 20,
    height: 20,
  },
  locationName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    flex: 1,
  },
  addressContainer: {
    marginLeft: 44,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#54595F",
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#54595F",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    paddingHorizontal: 24,
  },
});

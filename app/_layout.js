import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#d93927",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
          color: "#333333",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="services" options={{ title: "Our Services" }} />
      <Stack.Screen name="process" options={{ title: "Our Process" }} />
      <Stack.Screen name="reviews" options={{ title: "Customer Reviews" }} />
      <Stack.Screen name="locations" options={{ title: "Our Locations" }} />
      <Stack.Screen name="contact" options={{ title: "Contact Us" }} />
    </Stack>
  )
}

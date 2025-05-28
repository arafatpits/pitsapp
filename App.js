import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"

import HomeScreen from "./screens/HomeScreen"
import ServicesScreen from "./screens/ServicesScreen"
import ProcessScreen from "./screens/ProcessScreen"
import ReviewsScreen from "./screens/ReviewsScreen"
import LocationsScreen from "./screens/LocationsScreen"
import ContactScreen from "./screens/ContactScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ title: "Our Services" }} />
        <Stack.Screen name="Process" component={ProcessScreen} options={{ title: "Our Process" }} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: "Customer Reviews" }} />
        <Stack.Screen name="Locations" component={LocationsScreen} options={{ title: "Our Locations" }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: "Contact Us" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

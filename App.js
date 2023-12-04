import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Tabs/LoginScreen";
import Button from "./button/button";
import HomePage from "./Tabs/Homepage";
import SignUpScreen from "./Tabs/SignUpScreen";
import MedicineDetails from "./Tabs/MedicineDetails";
import Vitamins from "./Tabs/Vitamins";
import MedicineLists from "./Tabs/Medicinelists";
import MedicineInteractionChecker from "./Tabs/MedicineInteractionChecker";
import ForgotPassword from "./Tabs/ForgotPassword";
import { AuthProvider } from "./services/Auth";

const Stack = createStackNavigator();

const App = () => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Register" component={SignUpScreen} />
          <Stack.Screen name="MedicineDetails" component={MedicineDetails} />
          <Stack.Screen name="Vitamins" component={Vitamins} />
          <Stack.Screen name="MedicineLists" component={MedicineLists} />
          <Stack.Screen
            name="MedicineInteractionChecker"
            component={MedicineInteractionChecker}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const LogoutButton = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout actions
    signOut(); // Assuming a signOut function is available in your AuthContext
    navigation.navigate("HomeScreen"); // Navigate back to the HomeScreen or another desired screen after logout
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "#87CEEB",
      },
      headerTintColor: "#87CEEB",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GET STARTED</Text>
      </View>

      <View style={styles.subheader}>
        <Text style={styles.subtitle}>Find Your Medicine</Text>
      </View>

      <View style={styles.middle}>
        <Image
          source={require("./assets/383106429_224032337328938_3125433612829188699_n.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.footer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "skyblue",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  subheader: {},
  middle: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default App;

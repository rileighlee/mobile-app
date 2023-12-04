import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Clipboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ApiService from "../services/ApiService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert, ActivityIndicator } from "react-native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    fullName: "",
    dateOfBirth: new Date(),
    contactNumber: "",
    email: "",
    password: "",
    showDatePicker: false, // State to toggle date picker visibility
    recoveryPhrase: "", // State to store recovery phrase
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpPress = async () => {
    try {
      setIsLoading(true); // Activate loading state
      const response = await ApiService.registerUser(userData);
      await setTimeout(() => {
        setIsLoading(false); // Deactivate loading state after 100ms (simulate signup process)
        const recoveryPhrase = generateRecoveryPhrase(); // Replace with your function to get the recovery phrase
        setUserData({ ...userData, recoveryPhrase });
        showRecoveryPhraseAlert(recoveryPhrase);
        navigation.navigate("Login");
      }, 100);
    } catch (error) {
      setIsLoading(false); // In case of error, deactivate loading state
      console.error("Error during registration:", error.message);
      // Handle registration error
    }
  };

  const generateRecoveryPhrase = () => {
    // Replace this with your logic to generate the recovery phrase
    // For demonstration purposes, creating a random recovery phrase
    const phrase = "example recovery phrase";
    return phrase;
  };

  const showRecoveryPhraseAlert = async (recoveryPhrase) => {
    await Clipboard.setString(recoveryPhrase);
    Alert.alert(
      "Recovery Phrase",
      `Your recovery phrase is: ${recoveryPhrase}`,
      [
        {
          text: "Copy",
          onPress: () => {
            Alert.alert("Copied", "Recovery phrase copied to clipboard!");
          },
        },
        {
          text: "OK",
        },
      ]
    );
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setUserData({
        ...userData,
        dateOfBirth: selectedDate,
        showDatePicker: Platform.OS === "ios",
      });
    }
  };

  const showDatePicker = () => {
    setUserData({ ...userData, showDatePicker: true });
  };

  const hideDatePicker = () => {
    setUserData({ ...userData, showDatePicker: false });
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={userData.fullName}
        onChangeText={(text) => setUserData({ ...userData, fullName: text })}
      />

      <Pressable onPress={showDatePicker}>
        <View style={styles.dateText}>
          <Text style={styles.dateInputText}>
            {userData.dateOfBirth.toLocaleDateString()}
          </Text>
        </View>
      </Pressable>

      {userData.showDatePicker && (
        <DateTimePicker
          value={userData.dateOfBirth}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        placeholder="Contact Number"
        style={styles.input}
        value={userData.contactNumber}
        onChangeText={(text) =>
          setUserData({ ...userData, contactNumber: text })
        }
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />

      <Pressable style={styles.signUpButton} onPress={handleSignUpPress}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginTop: -60,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
  },
  form: {
    marginTop: 40,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    // Style for the DatePicker container
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  dateInput: {
    // Style for the DatePicker input field
    borderWidth: 0,
  },
  dateInputText: {
    // Style for the DatePicker date text
    fontSize: 16,
  },
  datePlaceholderText: {
    // Style for the DatePicker placeholder text
    fontSize: 16,
  },
});

export default SignUpScreen;

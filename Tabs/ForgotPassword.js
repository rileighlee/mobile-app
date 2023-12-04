import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ApiService from "../services/ApiService";
import { Alert } from "react-native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      if (recoveryPhrase && newPassword === confirmPassword) {
        await ApiService.ForgotPasswordWithRecoveryPhrase({
          recoveryPhrase,
          password: newPassword,
        });
        Alert.alert("Success", "Password reset successfully!");
        navigation.navigate("Login");
        Keyboard.dismiss();
      } else {
        // Handle missing recovery phrase or password mismatch error
        Alert.alert("Error", "Recovery phrase and passwords should match.");
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      // Handle password reset error (display error message, etc.)
      Alert.alert("Error", "Failed to reset password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.subtitle}>
          Enter your recovery phrase and new password.
        </Text>
        <TextInput
          placeholder="Recovery Phrase"
          style={styles.input}
          value={recoveryPhrase}
          onChangeText={(text) => setRecoveryPhrase(text)}
        />
        <TextInput
          placeholder="New Password"
          style={styles.input}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Pressable style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
      </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Change text color to black
  },
  form: {},
  subtitle: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ForgotPassword;

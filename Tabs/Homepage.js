import React, { useState, useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../services/Auth";
import ApiService from "../services/ApiService";

const { height: screenHeight } = Dimensions.get("window");

const HomePage = () => {
  const route = useRoute();
  const { token } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");

  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    navigation.navigate("Login"); // Navigate to the login screen after logout
  };

  // Set up the navigation options for the header

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await ApiService.getUserDetail(token);
        if (userDetails && userDetails.fullName) {
          setFullName(userDetails.fullName);
        } else {
          setFullName(""); // Set fullName to an empty string if userDetails.fullName is missing
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        // Handle error fetching user details
        setFullName(""); // Set fullName to an empty string in case of an error
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  // Initialize searchText as an empty string
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const results = await ApiService.getMedicineByName(searchText);
      setSearchResults(results);
      setModalVisible(true);
    } catch (error) {
      console.error("Error searching medicine:", error.message);
      // Handle error
    }
  };

  const navigateToMedicineDetails = (medicineId) => {
    navigation.navigate("MedicineDetails", { medicineId });
    setModalVisible(false);
  };
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Hi, ${fullName || "User"}!`, // Fallback to 'User' if fullName is not available
      headerLeft: null, // Hide the back button
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={25} color="white" />
        </TouchableOpacity>
        // Replace this button with your custom LogoutButton component
      ),
      headerStyle: {
        backgroundColor: "#6499E9", // Set header background color
      },
      headerTintColor: "white",
    });
  }, [navigation, fullName]);
  
  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Text style={styles.bigText}>Finding a perfect medicine?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicine ex. 'Biogesic'"
            onChangeText={setSearchText}
            value={searchText}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
            <Image
              source={require("../assets/search.png")}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerHalf}>
        <Text style={styles.categoriesText}>Categories</Text>
        <View style={styles.iconContainer}>
          <View style={styles.circleBackground}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() =>
                navigation.navigate("MedicineLists", {
                  searchText: "Medicine",
                })
              }
            >
              <Image
                source={require("../assets/medicine.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.circleBackground}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("Vitamins")}
            >
              <Image
                source={require("../assets/vitamins.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.circleBackground}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("MedicineInteractionChecker")}
            >
              <Image
                source={require("../assets/comparing.png")}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {searchResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                style={styles.resultContainer}
                onPress={() => navigateToMedicineDetails(result.id)}
              >
                <Text style={styles.resultText}>{result.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9F5FF",
  },
  upperHalf: {
    height: screenHeight * 0.4,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#6499E9",
    justifyContent: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  lowerHalf: {
    flex: 1,
    paddingHorizontal: 20,
  },
  smallText: {
    fontSize: 15,
    marginBottom: 10,
    position: "relative",
    marginLeft: -200,
    color: "white",
  },
  bigText: {
    fontSize: 40,
    marginBottom: 10,
    position: "relative",
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20, // Adjusted padding
    marginHorizontal: 10, // Adjusted margin
    marginTop: 10, // Adjusted margin
  },
  searchInput: {
    flex: 1, // Adjusted flex
    fontSize: 16,
    paddingVertical: 5,
  },
  searchIcon: {
    padding: 10,
    marginLeft: "auto", // Align to the right end
  },
  searchImage: {
    width: 20,
    height: 20,
  },
  calendarContainer: {
    marginTop: 20,
    aspectRatio: 1,
    overflow: "scroll",
    borderRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  categoriesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  circleBackground: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    alignItems: "center",
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  logoutButton: {
    marginRight: 10, // Adjust spacing if needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;

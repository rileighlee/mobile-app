import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Picker,
} from "react-native";
import ApiService from "../services/ApiService";
import { useNavigation } from '@react-navigation/native'; 

const { height: screenHeight } = Dimensions.get("window");

const MedicineInteractionChecker = () => {
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: "#FFA0D2",
      },
      headerTintColor: "#b54c83",
    });
  }, [navigation]);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine1, setSelectedMedicine1] = useState("");
  const [selectedMedicine2, setSelectedMedicine2] = useState("");
  const [interactionResult, setInteractionResult] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const medicineList = await ApiService.getAllMedicine();
      const translatedMedicineList = medicineList.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.id,
      }));
      setMedicines(translatedMedicineList);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleCheckInteraction = async () => {
    if (selectedMedicine1 && selectedMedicine2) {
      try {
        const interactionResult = await ApiService.checkMedicineInteraction(
          selectedMedicine1,
          selectedMedicine2
        );
        setInteractionResult(
          interactionResult.interaction ?? "No interaction found."
        );
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <View style={styles.logoBackground}>
          <Image
            source={require("../assets/comparing.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Medicine Interaction Checker</Text>
      </View>
      <View style={styles.lowerHalf}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMedicine1}
            style={styles.dropdown}
            onValueChange={(itemValue) => setSelectedMedicine1(itemValue)}
          >
            <Picker.Item label="Select Medicine 1" value="" />
            {medicines.map((medicine) => (
              <Picker.Item
                key={medicine.id}
                label={medicine.name}
                value={medicine.id}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedMedicine2}
            style={styles.dropdown}
            onValueChange={(itemValue) => setSelectedMedicine2(itemValue)}
          >
            <Picker.Item label="Select Medicine 2" value="" />
            {medicines.map((medicine) => (
              <Picker.Item
                key={medicine.id}
                label={medicine.name}
                value={medicine.id}
              />
            ))}
          </Picker>
        </View>
        <Button title="Check Interaction" onPress={handleCheckInteraction} color="#FFA0D2"/>
        <View style={styles.resultContainer}>
          <Text style={styles.interactionText}>
            Interaction: 
          </Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            {interactionResult}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  upperHalf: {
    height: screenHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#FFA0D2",
  },
  logoBackground: {
    width: 100,
    height: 100,
    backgroundColor: "#FFC8E5",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  lowerHalf: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#b54c83",
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  interactionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  result: {
    fontSize: 15,
    color: "#333",
    textAlign: "justify"
  },
});

export default MedicineInteractionChecker;

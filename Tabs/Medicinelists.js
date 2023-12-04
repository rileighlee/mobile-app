import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import ApiService from "../services/ApiService"; // Import your ApiService

const { height: screenHeight } = Dimensions.get("window");

const MedicineLists = ({ navigation }) => {
  const [categoriesWithMedicines, setCategoriesWithMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: "#F2ABFF", // Set header background color
      },
      headerTintColor: "#A3007F",
    });
  }, [navigation]);

  useEffect(() => {
    fetchCategoriesWithMedicines();
  }, []);

  const fetchCategoriesWithMedicines = async () => {
    try {
      const data = await ApiService.getAllCategoriesWithMedicines();
      setCategoriesWithMedicines(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleCategoryClick = (index) => {
    setSelectedCategory(index === selectedCategory ? null : index);
  };

  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
    navigation.navigate("MedicineDetails", { medicineId: medicine.id }); // Pass medicine.id
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <View style={styles.logoBackground}>
          <Image
            source={require("../assets/medicine.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Medicine List</Text>
      </View>
      <View style={styles.lowerHalf}>
        {categoriesWithMedicines.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => handleCategoryClick(index)}
            style={styles.barContainer}
          >
            <View style={styles.barTitleContainer}>
              <Text style={styles.barTitle}>{category.name}</Text>
              {/* Add your down arrow logic */}
            </View>
            {/* Medicine list logic */}
            {selectedCategory === index && (
              <View style={styles.medicineList}>
                {category.medicines.map((medicine, medIndex) => (
                  <Pressable
                    key={medIndex}
                    onPress={() => handleMedicineClick(medicine)}
                    style={styles.medicineItem}
                  >
                    <Text style={styles.medicineText}>{medicine.name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FADEFF",
  },
  upperHalf: {
    height: screenHeight * 0.3,
    justifyContent: "center",
    backgroundColor: "#F2ABFF",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logoBackground: {
    width: 100,
    height: 100,
    backgroundColor: "white",
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
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#A3007F",
  },
  barContainer: {
    marginBottom: 10,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 20,
    backgroundColor: "white",
    fontStyle: "italic",
  },
  barTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  barTitle: {
    fontSize: 16,
    fontWeight: "italic",
    marginBottom: 5,
  },
  downArrow: {
    fontSize: 12,
  },
  medicineList: {
    marginVertical: 10,
  },
  medicineItem: {
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 20,
    backgroundColor: "white",
    marginVertical: 5,
  },
  medicineText: {
    fontSize: 16,
  },
});

export default MedicineLists;

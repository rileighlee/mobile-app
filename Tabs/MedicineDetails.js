import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { Card } from "react-native-elements"; // Assuming the Card component comes from a library like react-native-elements
import ApiService from "../services/ApiService";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const MedicineDetails = ({ route }) => {
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "#89fff8",
      },
      headerTintColor: "black",
    });
  }, [navigation]);

  const { medicineId } = route.params;
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    dosageAndFrequency: false,
    precautions: false,
    overdosage: false,
  });

  useEffect(() => {
    fetchMedicineDetails();
  }, []);

  const fetchMedicineDetails = async () => {
    try {
      const data = await ApiService.getMedicineById(medicineId);
      setMedicineDetails(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const renderCard = (title, content) => {
    return (
      <Card containerStyle={styles.card}>
        <Pressable onPress={() => toggleSection(title.toLowerCase())}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{title}</Text>
            <FontAwesome
              name={
                expandedSections[title.toLowerCase()]
                  ? "angle-up"
                  : "angle-down"
              }
              size={20}
              color="#000"
            />
          </View>
        </Pressable>
        {expandedSections[title.toLowerCase()] && (
          <View style={styles.cardContent}>
            <Text style={styles.infoText}>{content}</Text>
          </View>
        )}
      </Card>
    );
  };

  const renderMedicineDetails = () => {
    if (!medicineDetails) return null;

    const details = [
      { title: "Description", content: medicineDetails.description },
      {
        title: "Dosage and Frequency",
        content: medicineDetails.dosageAndFrequency,
      },
      { title: "Precautions", content: medicineDetails.precautions },
      { title: "Overdosage", content: medicineDetails.overdosage },
    ];

    return (
      <ScrollView style={styles.scrollView}>
        {details.map((detail, index) => (
          <View key={index}>{renderCard(detail.title, detail.content)}</View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <View style={styles.leftContent}>
          <Image
            source={require("../assets/human.png")}
            style={styles.humanImage}
          />
        </View>
        <View style={styles.rightContent}>
          <Image source={medicineDetails?.image} style={styles.medicineImage} />
          <Text style={styles.medicineName}>{medicineDetails?.name}</Text>
        </View>
      </View>
      <View style={styles.lowerHalf}>
        {renderMedicineDetails()}
        <Text style={styles.consultDoctorText}>
          If symptoms persist, consult your doctor.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00F1C6",
  },
  upperHalf: {
    height: screenHeight * 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89fff8",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  lowerHalf: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 20,
  },
  leftContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  humanImage: {
    position: "relative",
    marginBottom: -100,
    marginLeft: -4,
    width: 170,
    height: 170,
    resizeMode: "cover",
  },
  medicineImage: {
    marginRight: 50,
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  medicineName: {
    marginRight: 50,
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
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
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
  },
  consultDoctorText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
});

export default MedicineDetails;

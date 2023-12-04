import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");

const Vitamins = () => {
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "#f3ff6b",
      },
      headerTintColor: "black",
    });
  }, [navigation]);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const bubbleData = [
    {
      title: "A",
      description:
        "Vitamin A is essential for maintaining good vision and supporting the immune system.",
      goodSource: [
        "Liver\n",
        "Sweet Potatoes\n",
        "Carrots\n",
        "Pumpkin\n",
        "Spinach\n",
        "Kale\n",
        "Cantaloupe\n",
        "Mango\n",
        "Red Bell Peppers\n",
        "Apricots\n",
        "Eggs\n",
        "Dairy Products\n",
      ],
      image: require("../assets/A.png"),
    },
    {
      title: "B1",
      description:
        "itamin B1, also known as Thiamine, is crucial for converting food into energy and maintaining proper nerve function. It plays a vital role in the metabolism of carbohydrates, helping your body utilize glucose efficiently.",
      goodSource: ["Whole grains\n", "Legumes\n", "Nuts\n", "Lean pork\n"],
      image: require("../assets/B1.png"),
    },
    {
      title: "B2",
      description:
        "Vitamin B2, or Riboflavin, is essential for energy production and the maintenance of healthy skin, eyes, and nerve functions. It plays a key role in various metabolic processes and the body's antioxidant defense.",
      goodSource: [
        "Dairy products (milk, yogurt, cheese)\n",
        "Lean meats (beef, chicken, turkey)\n",
        "Eggs\n",
        "Leafy green vegetables (spinach, kale)\n",
        "Nuts and seeds (almonds, sunflower seeds)\n",
        "Fortified cereals and grains\n",
        "Mushrooms\n",
      ],
      image: require("../assets/B2.png"),
    },
    {
      title: "B3",
      description:
        "Vitamin B3, or niacin, is crucial for maintaining digestive health, skin integrity, nerve function, metabolism, and healthy cholesterol levels.",
      goodSource: [
        "Chicken breast\n",
        "Salmon\n",
        "Peanuts\n",
        "Sunflower seeds\n",
        "Whole wheat bread\n",
        "Green peas\n",
      ],
      image: require("../assets/B3.png"),
    },
    {
      title: "B6",
      description:
        "Vitamin B6 is used in the body for functions like brain development, immune system support, and the formation of hemoglobin, which carries oxygen in the blood.",
      goodSource: [
        "Chicken\n",
        "Turkey\n",
        "Tuna\n",
        "Salmon\n",
        "Pork\n",
        "Beef\n",
        "Lentils\n",
        "Sunflower Seeds\n",
        "Bananas\n",
        "Potatoes\n",
        "Spinach\n",
        "Avocado\n",
        "Brown Rice\n",
      ],
      image: require("../assets/B6.png"),
    },
    {
      title: "B7",
      description:
        "Vitamin B7, also known as biotin, is essential for promoting healthy skin, hair, and nails.",
      goodSource: [
        "Nuts\n",
        "Eggs\n",
        "Sweet Potatoes\n",
        "Leafy Green Vegetables\n",
      ],
      image: require("../assets/B7.png"),
    },
    {
      title: "B9",
      description:
        "Vitamin B9 is essential for DNA synthesis and cell growth, making it particularly important during pregnancy.",
      goodSource: [
        "Spinach\n",
        "Lentils\n",
        "Chickpeas\n",
        "Asparagus\n",
        "Broccoli\n",
        "Beets\n",
        "Cauliflower\n",
        "Citrus Fruits\n",
        "Papayas\n",
        "Avocado\n",
      ],
      image: require("../assets/B9.png"),
    },
    {
      title: "B12",
      description:
        "Vitamin B12 is essential for maintaining healthy nerve cells and aiding in the production of DNA and RNA.",
      goodSource: [
        "Liver\n",
        "Shellfish\n",
        "Fish (e.g., salmon, trout)\n",
        "Meat\n",
        "Eggs\n",
        "Dairy products\n",
        "Fortified foods (e.g., breakfast cereals, plant-based milk substitutes)\n",
      ],
      image: require("../assets/B12.png"),
    },
    {
      title: "C",
      description:
        "Vitamin C, also known as ascorbic acid, is essential for collagen production, immune system support, and acts as an antioxidant protecting cells from damage.",
      goodSource: [
        "Oranges\n",
        "Strawberries\n",
        "Kiwi\n",
        "Guava\n",
        "Papaya\n",
        "Mango\n",
        "Pineapple\n",
        "Watermelon\n",
        "Tomatoes\n",
        "Broccoli\n",
        "Spinach\n",
        "Red and Green Bell Peppers\n",
        "Kale\n",
      ],
      image: require("../assets/C.png"),
    },
    {
      title: "D",
      description:
        "Vitamin D is essential for maintaining healthy bones and teeth, as well as supporting the immune system.",
      goodSource: [
        "Fatty fish (salmon, mackerel, tuna, etc.)\n",
        "Cod liver oil\n",
        "Egg yolks\n",
        "Cheese\n",
        "Mushrooms (exposed to sunlight)\n",
        "Fortified foods (e.g., fortified milk and cereals)\n",
      ],
      image: require("../assets/D.png"),
    },
    {
      title: "E",
      description:
        "Vitamin E is essential for its antioxidant properties, protecting cells from oxidative damage and supporting the immune system.",
      goodSource: [
        "Almonds\n",
        "Sunflower Seeds\n",
        "Hazelnuts\n",
        "Spinach\n",
        "Broccoli\n",
        "Kiwi\n",
        "Mango\n",
        "Tomato\n",
        "Avocado\n",
        "Fish\n",
        "Various Oils\n",
        "Peanut Butter\n",
        "Various Greens\n",
        "Berries\n",
        "Goji Berries\n",
        "Eggs\n",
        "Milk\n",
        "Various Spices\n",
      ],
      image: require("../assets/E.png"),
    },
    {
      title: "K",
      description:
        "Vitamin K is essential for blood clotting and bone health and plays a role in regulating calcium in the body, which is important for heart and muscle function.",
      goodSource: [
        "Leafy Greens\n",
        "Cheese\n",
        "Meat\n",
        "Oils\n",
        "Juices\n",
        "Fruits\n",
        "Nuts\n",
        "Seeds\n",
        "Seafood\n",
        "Poultry\n",
        "Meat\n",
      ],
      image: require("../assets/K.png"),
    },
  ];

  const handleBubbleClick = (index) => {
    setSelectedBubble(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Image
          source={require("../assets/vitamins.png")}
          style={styles.vitaminsImage}
        />
        <Text style={styles.title}>Vitamins Cheat Sheet</Text>
      </View>
      <View style={styles.lowerHalf}>
        {bubbleData.map((bubble, index) => (
          <Pressable
            key={index}
            onPress={() => handleBubbleClick(index)}
            style={{
              ...styles.bubbleContainer,
              backgroundColor: selectedBubble === index ? "#89fff8" : "white",
            }}
          >
            <Text style={styles.bubbleTitle}>{bubble.title}</Text>
          </Pressable>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {bubbleData[selectedBubble]?.title}
            </Text>
            <View style={styles.modalDescriptionContainer}>
              <Text style={styles.modalDescription}>
                <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  What we use it for?
                </Text>
                {"\n"}
                {bubbleData[selectedBubble]?.description}
              </Text>
            </View>
            <Text style={styles.modalGoodSource}>
              <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                Good source:
              </Text>
              {"\n"}
              {bubbleData[selectedBubble]?.goodSource.map((source, i) => (
                <Text key={i}>• {source}</Text>
              ))}
            </Text>
            <Pressable onPress={closeModal}>
              <Text style={styles.modalCloseButton}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDF8E",
  },
  upperHalf: {
    height: screenHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3ff6b",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  vitaminsImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF5959",
  },
  lowerHalf: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bubbleContainer: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 100,
    marginVertical: 5,
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF5959",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF5959",
    marginBottom: 10,
  },
  modalDescriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalDescription: {
    fontSize: 15,
    marginBottom: 10,
    flex: 1,
  },
  modalGoodSource: {
    fontSize: 15,
    marginBottom: 10,
  },
  modalCloseButton: {
    fontSize: 20,
    color: "#FF5959",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#89fff8",
    borderRadius: 10,
  },
});

export default Vitamins;

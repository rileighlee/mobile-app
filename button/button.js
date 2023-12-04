import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, 
        marginVertical: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200, 
      },
      buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%', 
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // Center the text within the button
      },
    });

export default Button;



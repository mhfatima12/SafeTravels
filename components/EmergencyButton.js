import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function EmergencyButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlertCard({ message, details }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
});

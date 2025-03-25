import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaxiCard({ name, seats }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{seats}</Text>
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
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
});

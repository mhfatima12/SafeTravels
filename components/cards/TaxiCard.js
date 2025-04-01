import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export default function TaxiCard({ name, surname, seats, vehicle, departTime }) {

  const getInitials = (name, surname) => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };  

  return (
    <View style={styles.card}>
      <View style={styles.driverPhoto}>
        <Text style={styles.initials}>{getInitials(name, surname)}</Text>
      </View>
      <View>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.seatRow}>
          <Text style={styles.details}>{seats}</Text>
          <Text style={styles.details}> • Departs in {departTime}</Text>
        </View>
        <View style={styles.vehicleRow}>
          <Text style={styles.vehicleEmoji}>🚗</Text>
          <Text style={styles.vehicleDetails}>{vehicle}</Text>
        </View>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
  vehicleRow: {
    flexDirection: 'row', // Places emoji & text in a row
    alignItems: 'center', // Aligns them vertically
    marginTop: 5,
  },
  vehicleEmoji: {
    fontSize: 16, 
    marginRight: 5, // Adds spacing between emoji & text
  },
  vehicleDetails: {
    fontSize: 14,
    color: 'black',
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes it a perfect circle
    backgroundColor: '#ddd', // Gray background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  seatRow: {
    flexDirection: 'row', // Makes seat number & text appear side by side
    alignItems: 'center',
    marginTop: 5,
  },
  initials: {
    color: '#666', // Dark gray text
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginTop: '10',
  },
  requestButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

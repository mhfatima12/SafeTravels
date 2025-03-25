import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import TaxiCard from '../components/TaxiCard';
import ScreenHeader from '../components/ScreenHeader';
import { Primary, Secondary, TextDark, TextLight } from '../constants/colours';

const rideShares = [
  { id: '1', name: 'Alex to Downtown', seats: 'Time & Seats available' },
  { id: '2', name: 'Mia to Museum', seats: 'Time & Seats available' },
];

export default function TaxiShareScreen() {

  const header = "Taxi Share";

  return (
    <View style={styles.container}>
      <ScreenHeader header={header} />

      <View style={{ padding: 20 }}>
        <Text style={styles.label}>Where are you going?</Text>
        <TextInput style={styles.input} placeholder="South Bus Terminal" />

        <Text style={styles.label}>When are you traveling?</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.selectedButton}>
            <Text style={styles.selectedText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unselectedButton}>
            <Text style={styles.unselectedText}>Tomorrow</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.findButton}>
          <Text style={styles.findButtonText}>Find Taxi Partners</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Current Available Ride Shares:</Text>
        <FlatList
          data={rideShares}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaxiCard name={item.name} seats={item.seats} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Primary,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: TextDark,
  },
  input: {
    backgroundColor: TextLight,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: Secondary,
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  selectedText: {
    fontWeight: 'bold',
    color: TextDark,
  },
  unselectedButton: {
    backgroundColor: TextLight,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Secondary,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  unselectedText: {
    color: TextDark,
  },
  findButton: {
    backgroundColor: Primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  findButtonText: {
    color: TextLight,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Primary,
  },
});
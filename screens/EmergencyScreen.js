import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmergencyButton from '../components/EmergencyButton';

export default function EmergencyScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency</Text>
      <EmergencyButton />
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={styles.optionButton}><Text>📞 Local Emergency Services</Text></TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}><Text>📞 Emergency Contact</Text></TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}><Text>🏛️ Embassy</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 8, 
    marginVertical: 10, 
    alignItems: 'center', 
    borderWidth: 1,
    width: '300',
  },
});

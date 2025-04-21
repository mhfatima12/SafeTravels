// ReportCrimeForm.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as Location from 'expo-location';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ReportCrimeForm({ visible, onClose, onSubmitComplete }) {
  // crime types to pick
  const [crimeTypes, setCrimeTypes] = useState({
    assault: false,
    theft: false,
    vandalism: false,
    harassment: false,
    noise: false,
    other: false,
  });
  const [otherCrime, setOtherCrime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [useManualLocation, setUseManualLocation] = useState(false);

  // checkbox for crime choice
  const toggleCheckbox = (key) => {
    setCrimeTypes({ ...crimeTypes, [key]: !crimeTypes[key] });
  };

  // choose your location or manually enter
  const handleLocationPick = async () => {
    try {
      setUseManualLocation(false);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Could not get location');
    }
  };

  const handleSubmit = async () => {
    const selectedCrimes = Object.keys(crimeTypes).filter((key) => crimeTypes[key]);
    if (crimeTypes.other && otherCrime.trim()) {
      selectedCrimes.push(otherCrime.trim());
    }

    const report = {
      types: selectedCrimes,
      description,
      location: useManualLocation ? manualLocation : location,
      time: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'crimeReports'), report);
      console.log('Report saved:', report);

      setLocation(null);
      setManualLocation('');
      setUseManualLocation(false);
      setDescription('');
      setOtherCrime('');
      setCrimeTypes({
        assault: false,
        theft: false,
        vandalism: false,
        harassment: false,
        noise: false,
        other: false,
      });

      onSubmitComplete?.();
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.xButton} onPress={onClose}>
            <Text style={styles.xText}>✕</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.header}>📢 Report a Crime</Text>

            <Text style={styles.subHeader}>Select Type(s):</Text>
            {Object.entries(crimeTypes).map(([key, value]) => (
              <CheckBox
                key={key}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={value}
                onPress={() => toggleCheckbox(key)}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                textStyle={{ fontWeight: 'normal' }}
              />
            ))}

            {crimeTypes.other && (
              <TextInput
                style={styles.input}
                placeholder="Describe other crime type..."
                value={otherCrime}
                onChangeText={setOtherCrime}
              />
            )}

            <Text style={styles.subHeader}>Details (optional):</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe what happened..."
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.locationButton} onPress={handleLocationPick}>
              <Text style={styles.locationButtonText}>
                {location && !useManualLocation ? 'Location Set ✅' : '📍 Use My Location'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => {
                setUseManualLocation(true);
                setLocation(null);
              }}
            >
              <Text style={styles.locationButtonText}>
                {useManualLocation ? 'Manual Location Set ✅' : 'Enter Location Manually'}
              </Text>
            </TouchableOpacity>

            {useManualLocation && (
              <TextInput
                style={styles.input}
                placeholder="Enter location (e.g., Main Street, Swords)"
                value={manualLocation}
                onChangeText={setManualLocation}
              />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '90%',
  },
  content: { paddingBottom: 20 },
  xButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
  },
  xText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    minHeight: 50,
    textAlignVertical: 'top',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  locationButtonText: {
    color: '#333',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#999',
    fontSize: 16,
  },
});

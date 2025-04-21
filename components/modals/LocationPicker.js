import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function LocationPicker({ visible, onClose, onLocationSelect }) {
  // unused for now -> to be implemented into manual location picker in report crime form
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <GooglePlacesAutocomplete
            placeholder="Search location"
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              onLocationSelect({ lat, lng });
              onClose();
            }}
            query={{
              key: 'AIzaSyAtzzuM8Z6E9PH2g3DOHaB8QFk77S2CHTY',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.textInput,
            }}
          />

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    height: 400,
    justifyContent: 'flex-start',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
  },
  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  cancelText: {
    color: '#999',
    fontSize: 16,
  },
});

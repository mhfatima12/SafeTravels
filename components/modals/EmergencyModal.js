import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function EmergencyModal({ visible, onClose, message }) {
  // mimic a phone call
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.icon}>📞</Text>
          <Text style={styles.callingText}>Calling...</Text>
          <Text style={styles.contactText}>{message}</Text>
          <ActivityIndicator size="large" color="#ff4d4d" style={{ marginVertical: 20 }} />
          <TouchableOpacity onPress={onClose} style={styles.endCallButton}>
            <Text style={styles.endCallText}>End Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 40,
    marginHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
    marginBottom: 15,
  },
  callingText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  contactText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  endCallButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },
  endCallText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

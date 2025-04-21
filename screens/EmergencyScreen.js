// react
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// components
import EmergencyButton from '../components/buttons/EmergencyButton'
import ScreenHeader from '../components/ScreenHeader';
import EmergencyModal from '../components/modals/EmergencyModal'

export default function EmergencyScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // click button to call
  const handlePress = (service) => {
    setModalMessage(`${service} is being called`);
    setModalVisible(true);
  };

  return (
    <View>
      <ScreenHeader header={'Emergency'} />
      <View style={styles.container}>
        <EmergencyButton />
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress('Local Emergency Services')} ><Text style={styles.textStyle}>📞 Local Emergency Services</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress('Emergency Contact')} ><Text style={styles.textStyle}>📞 Emergency Contact</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress('Embassy')} ><Text style={styles.textStyle}>🏛️ Embassy</Text></TouchableOpacity>
        </View>
      </View>
      <EmergencyModal visible={modalVisible} onClose={() => setModalVisible(false)} message={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150
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
    height: '50'
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center'
  }
});

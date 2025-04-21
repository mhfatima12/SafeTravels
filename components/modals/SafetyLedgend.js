import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function SafetyLegend() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* ? Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.circle}
      >
        <Text style={styles.questionMark}>?</Text>
      </TouchableOpacity>

      {/* Legend Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.legendBox}>
            <Text style={styles.legendTitle}>Safety Colour Legend</Text>

            <View style={styles.legendItem}>
              <View style={[styles.colorCircle, { backgroundColor: 'rgba(76, 175, 80, 1)' }]} />
              <Text style={styles.legendText}>Green – 9-10 (Very Safe)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.colorCircle, { backgroundColor: 'rgba(144, 238, 144, 1)' }]} />
              <Text style={styles.legendText}>Light Green – 8 (Safe)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.colorCircle, { backgroundColor: 'rgba(244, 196, 48, 1)' }]} />
              <Text style={styles.legendText}>Yellow – 6-7 (Moderate)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.colorCircle, { backgroundColor: 'rgba(243, 156, 18, 1)' }]} />
              <Text style={styles.legendText}>Orange – 4-5 (Caution)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.colorCircle, { backgroundColor: 'rgba(230, 57, 70, 1)' }]} />
              <Text style={styles.legendText}>Red – 0-3 (High Risk)</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 4
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#1D3557',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    elevation: 4,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
});

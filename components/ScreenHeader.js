import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Primary, TextLight } from '../constants/colours';

export default function ScreenHeader({ header }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Primary,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TextLight,
        textAlign: 'center',
      },
});

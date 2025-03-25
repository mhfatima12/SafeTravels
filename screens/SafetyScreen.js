import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import AlertCard from '../components/cards/AlertCard';
import ScreenHeader from '../components/ScreenHeader';
import { Primary, Background, TextDark, RedZone, OrangeZone, YellowZone } from '../constants/colours';

const alerts = [
  { id: '1', message: 'Pickpocketing reported', details: '2 incidents in last 24 hours' },
];

export default function SafetyScreen() {
  const header = "Safety";

  return (
    <View style={styles.container}>
      <ScreenHeader header={header} />

      <View style={{ padding: 20, }}>
        {/* Map with Overlays */}
        <View style={styles.mapContainer}>
          <ImageBackground
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Map_of_Swords.png' }}
            style={styles.map}
          >
            <View style={[styles.zone, styles.redZone]}><Text style={styles.zoneText}>Red Zone</Text></View>
            <View style={[styles.zone, styles.yellowZone]}><Text style={styles.zoneText}>Yellow Zone</Text></View>
            <View style={[styles.zone, styles.orangeZone]}><Text style={styles.zoneText}>Orange Zone</Text></View>
          </ImageBackground>
        </View>

        {/* Area Safety Rating */}
        <View style={styles.safetyRatingContainer}>
          <Text style={styles.safetyLabel}>Current Area Rating:</Text>
          <View style={styles.safetyScoreBar}>
            <View style={styles.safetyScoreFill} />
            <Text style={styles.safetyScoreText}>7/10</Text>
          </View>
        </View>

        {/* Local Alerts */}
        <Text style={styles.alertsHeader}>Local Alerts:</Text>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AlertCard message={item.message} details={item.details} />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Background,
  },
  headerContainer: {
    backgroundColor: Primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mapContainer: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  zone: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redZone: {
    backgroundColor: 'rgba(230, 57, 70, 0.6)',
    borderColor: RedZone,
    borderWidth: 2,
    top: 20,
    left: 40,
  },
  yellowZone: {
    backgroundColor: 'rgba(244, 196, 48, 0.6)',
    borderColor: YellowZone,
    borderWidth: 2,
    top: 10,
    right: 30,
  },
  orangeZone: {
    backgroundColor: 'rgba(243, 156, 18, 0.6)',
    borderColor: OrangeZone,
    borderWidth: 2,
    bottom: 20,
    left: 50,
  },
  zoneText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  safetyRatingContainer: {
    marginTop: 10,
  },
  safetyLabel: {
    fontSize: 16,
    color: TextDark,
    fontWeight: 'bold',
  },
  safetyScoreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    height: 15,
    marginTop: 5,
    overflow: 'hidden',
  },
  safetyScoreFill: {
    backgroundColor: YellowZone,
    width: '70%',
    height: '100%',
  },
  safetyScoreText: {
    position: 'absolute',
    right: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: TextDark,
  },
  alertsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TextDark,
    marginTop: 20,
  },
});

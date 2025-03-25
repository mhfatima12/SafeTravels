import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Primary, YellowZone, OrangeZone, RedZone, TextLight, TextDark } from '../constants/colours'
import ScreenHeader from '../components/ScreenHeader';

export default function HomeScreen() {
  const navigation = useNavigation();
  const header = 'SafeTravels'

  return (
    <View style={styles.container}>

      <ScreenHeader header={header} />

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.locationText}>Dublin, Ireland</Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Area Safety Rating */}
        <View style={styles.safetySection}>
          <Text style={styles.safetyText}>Current Area Safety:</Text>
          <View style={styles.safetyScore}>
            <Text style={styles.safetyScoreText}>7/10</Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Emergency')}>
          <View style={[styles.iconCircle, { backgroundColor: RedZone }]}>
            <Text style={styles.iconText}>SOS</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.navTitle}>Emergency</Text>
            <Text style={styles.navDescription}>Quick access to local emergency services</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Taxi Share')}>
          <View style={[styles.iconCircle, { backgroundColor: Primary }]}>
            <Text style={styles.iconText}>T</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.navTitle}>Taxi Share</Text>
            <Text style={styles.navDescription}>Find verified taxi partners nearby</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Safety')}>
          <View style={[styles.iconCircle, { backgroundColor: OrangeZone }]}>
            <Text style={styles.iconText}>S</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.navTitle}>Neighborhood Safety</Text>
            <Text style={styles.navDescription}>View safety zones and local alerts</Text>
          </View>
        </TouchableOpacity>

        {/* Local Alert */}
        <View style={styles.alertBox}>
          <Text style={styles.alertIcon}>❗</Text>
          <View>
            <Text style={styles.alertTitle}>Local Alert</Text>
            <Text style={styles.alertText}>Pickpocketing reported (2 incidents in last 24 hours)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  welcomeSection: {
    backgroundColor: '#c3dde3',
    marginBottom: 10,
    height: 70,
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 16,
    color: TextDark,
    marginLeft: 10
  },
  locationText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: TextDark,
    marginLeft: 10
  },
  safetySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  safetyText: {
    fontSize: 16,
    color: TextDark,
  },
  safetyScore: {
    backgroundColor: YellowZone,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  safetyScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TextLight,
  },
  navButton: {
    flexDirection: 'row',
    backgroundColor: TextLight,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    height: 90,
    justifyContent: 'center',
    padding: 10
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TextLight,
  },
  textContainer: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TextDark,
  },
  navDescription: {
    fontSize: 14,
    color: TextDark,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FFE5E5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10,
    color: RedZone,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TextDark,
  },
  alertText: {
    fontSize: 14,
    color: TextDark,
  },
});

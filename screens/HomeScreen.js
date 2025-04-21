// react
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// expo
import * as Location from 'expo-location';

// firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// consts
import { Primary, YellowZone, OrangeZone, RedZone, TextLight, TextDark } from '../constants/colours';

// components
import ScreenHeader from '../components/ScreenHeader';
import SafetyLegend from '../components/modals/SafetyLedgend';

export default function HomeScreen() {
  const navigation = useNavigation();
  const header = 'SafeTravels';

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // request user to share location, once shared save lon&lat and set to city, country
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      let reverseGeo = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverseGeo.length > 0) {
        setAddress(reverseGeo[0]);
      }
    })();
  }, []);

  // check fb for crimes in past 24 hrs 
  useEffect(() => {
    const fetchRecentCrimes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'crimeReports'));
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const crimeCount = {};

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const reportTime = new Date(data.time);
          if (reportTime >= last24h) {
            data.types.forEach((type) => {
              crimeCount[type] = (crimeCount[type] || 0) + 1;
            });
          }
        });

        const alertArray = Object.entries(crimeCount).map(([type, count]) => ({
          type,
          count,
        }));

        setAlerts(alertArray);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchRecentCrimes();
  }, []);

  const latestAlert = alerts[0];

  return (
    <View style={styles.container}>
      <ScreenHeader header={header} />

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.locationText}>
          {address ? `${address.city || address.region}, ${address.country}` : 'Loading...'}
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Area Safety Rating */}
        <View style={styles.safetySection}>
          <Text style={styles.safetyText}>Current Area Safety:</Text>
          <View style={styles.safetyScore}>
            <Text style={styles.safetyScoreText}>7/10</Text>
          </View>
          <View style={{ marginLeft: 110 }}>
            <SafetyLegend />
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
        {latestAlert ? (
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>❗</Text>
            <View>
              <Text style={styles.alertTitle}>Local Alert</Text>
              <Text style={styles.alertText}>
                {latestAlert.type.charAt(0).toUpperCase() + latestAlert.type.slice(1)} reported ({latestAlert.count} incident{latestAlert.count > 1 ? 's' : ''} in last 24 hrs)
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>❗</Text>
            <View>
              <Text style={styles.alertTitle}>Local Alert</Text>
              <Text style={styles.alertText}>No incidents in the last 24 hours</Text>
            </View>
          </View>
        )}
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

// react
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// location and map
import * as Location from 'expo-location';
import MapView, { Marker, Circle } from 'react-native-maps';

// components
import AlertCard from '../components/cards/AlertCard';
import ScreenHeader from '../components/ScreenHeader';
import ReportCrimeForm from '../components/modals/ReportCrimeForm';
import SafetyLegend from '../components/modals/SafetyLedgend';

// consts
import { Background, TextDark, RedZone, YellowZone } from '../constants/colours';

export default function SafetyScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // hard code soafety zones for now
  const safetyZones = [
    { id: 'swords', lat: 53.4590, lon: -6.2206, radius: 500, color: 'rgba(244, 196, 48, 0.4)', border: 'rgba(244, 196, 48, 1)' },
    { id: 'dublin_airport', lat: 53.4264, lon: -6.2499, radius: 500, color: 'rgba(76, 175, 80, 0.4)', border: 'rgba(76, 175, 80, 1)' },
    { id: 'malahide', lat: 53.4508, lon: -6.1543, radius: 400, color: 'rgba(76, 175, 80, 0.4)', border: 'rgba(76, 175, 80, 1)' },
    { id: 'portmarnock', lat: 53.4231, lon: -6.1375, radius: 400, color: 'rgba(76, 175, 80, 0.4)', border: 'rgba(76, 175, 80, 1)' },
    { id: 'donabate', lat: 53.4879, lon: -6.1517, radius: 400, color: 'rgba(144, 238, 144, 0.4)', border: 'rgba(144, 238, 144, 1)' },
    { id: 'blanchardstown', lat: 53.3912, lon: -6.3870, radius: 500, color: 'rgba(244, 196, 48, 0.4)', border: 'rgba(244, 196, 48, 1)' },
    { id: 'darndale', lat: 53.3963, lon: -6.1849, radius: 400, color: 'rgba(230, 57, 70, 0.4)', border: 'rgba(230, 57, 70, 1)' },
    { id: 'coolock', lat: 53.3950, lon: -6.1997, radius: 400, color: 'rgba(243, 156, 18, 0.4)', border: 'rgba(243, 156, 18, 1)' },
    { id: 'st_margarets', lat: 53.4577, lon: -6.3025, radius: 400, color: 'rgba(76, 175, 80, 0.4)', border: 'rgba(76, 175, 80, 1)' },
    { id: 'finglas', lat: 53.3900, lon: -6.2967, radius: 450, color: 'rgba(230, 57, 70, 0.4)', border: 'rgba(230, 57, 70, 1)' },
    { id: 'castleknock', lat: 53.3726, lon: -6.3844, radius: 450, color: 'rgba(76, 175, 80, 0.4)', border: 'rgba(76, 175, 80, 1)' },
    { id: 'drumcondra', lat: 53.3682, lon: -6.2569, radius: 450, color: 'rgba(244, 196, 48, 0.4)', border: 'rgba(244, 196, 48, 1)' },
  ];

  // get crimes from fb in past 244 hrs
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

      const alertArray = Object.entries(crimeCount).map(([type, count], index) => ({
        id: index.toString(),
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} reported`,
        details: `${count} incident${count > 1 ? 's' : ''} in past 24 hrs`,
      }));

      setAlerts(alertArray);
    } catch (error) {
      console.error('Error fetching crime alerts:', error);
    }
  };

  // fetch users location (permission is granted on home page)
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);
    } catch (err) {
      console.error('Error getting user location:', err);
    }
  };

  useEffect(() => {
    fetchRecentCrimes();
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader header={'Safety'} />

      <View style={{ padding: 20, flex: 1 }}>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
            {/* Map showing users location */}
              <View style={styles.mapContainer}>
                {userLocation ? (
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                  >
                    {/* Pinpoint users exact location */}
                    <Marker
                      coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                      }}
                      title="You are here"
                    />

                    {/* Safety Zones */}
                    {safetyZones.map((zone) => (
                      <Circle
                        key={zone.id}
                        center={{ latitude: zone.lat, longitude: zone.lon }}
                        radius={zone.radius}
                        fillColor={zone.color}
                        strokeColor={zone.border}
                        strokeWidth={2}
                      />
                    ))}
                  </MapView>
                ) : (
                  <Text>Loading map...</Text>
                )}
              </View>

              {/* Areas safety rating */}
              <View style={styles.safetyRatingContainer}>
                <View style={styles.safetyRow}>
                  <Text style={styles.safetyLabel}>Current Area Rating:</Text>
                  <SafetyLegend />
                </View>
                <View style={styles.safetyScoreBar}>
                  <View style={styles.safetyScoreFill} />
                  <Text style={styles.safetyScoreText}>7/10</Text>
                </View>
              </View>

                {/* Crime Alert */}
              <Text style={styles.alertsHeader}>Local Alerts:</Text>
            </>
          }
          renderItem={({ item }) => <AlertCard message={item.message} details={item.details} />}
          ListFooterComponent={
            <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.reportButtonText}>📢 Report a Crime</Text>
            </TouchableOpacity>
          }
        />

        {/* Report a crime */}
        <ReportCrimeForm
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmitComplete={fetchRecentCrimes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Background 
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  safetyRatingContainer: { 
    marginTop: 10 
  },
  safetyLabel: { 
    fontSize: 16, 
    color: TextDark, 
    fontWeight: 'bold' 
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
    marginBottom: 10,
  },
  reportButton: {
    backgroundColor: RedZone,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

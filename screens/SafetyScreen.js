import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// components
import AlertCard from '../components/cards/AlertCard';
import ScreenHeader from '../components/ScreenHeader';
import ReportCrimeForm from '../components/modals/ReportCrimeForm';

// constants
import { Primary, Background, TextDark, RedZone, OrangeZone, YellowZone } from '../constants/colours';

export default function SafetyScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchRecentCrimes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'crimeReports'));
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

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

    fetchRecentCrimes();
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
            {/* Map */}
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
  
            {/* Alerts heading */}
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
  
      <ReportCrimeForm visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Background,
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
});

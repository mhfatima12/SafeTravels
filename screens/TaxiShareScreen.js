// react
import {React, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

// components
import TaxiCard from '../components/cards/TaxiCard';
import ScreenHeader from '../components/ScreenHeader';
import { Primary, Secondary, TextDark, TextLight } from '../constants/colours';

// hard code rides for now
const rideShares = [
  { id: '1', name: 'Jack to Trinity College Dublin', surname: 'Kelly', seats: '3 seats available', departTime: '5 mins', vehicle: 'Black Toyota Prius', userLocation: 'Dublin Zoo', destination: 'Trinity College Dublin' },
  { id: '2', name: 'Mia to Museum', surname: 'Murphy', seats: '2 seats available', departTime: '10 mins', vehicle: 'Red Honda Civic', userLocation: 'Phoenix Park', destination: 'Museum' },
  { id: '3', name: 'John to Airport', surname: 'Kennedy', seats: '1 seat available', departTime: '30 mins', vehicle: 'Grey Audi A1', userLocation: 'Hueston Train Station', destination: 'Airport' },
  { id: '4', name: 'Sophie to South Bus Terminal', surname: 'Boyle', seats: '4 seats available', departTime: '45 mins', vehicle: 'White Opel Corsa', userLocation: '', destination: 'South Bus Terminal' },
];

export default function TaxiShareScreen() {

  const [destination, setDestination] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [filteredRideShares, setFilteredRideShares] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const header = "Taxi Share";

  // find taxis foing to destination
  const handleFindTaxiPartners = () => {
    const filtered = rideShares.filter(ride =>
      ride.destination.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredRideShares(filtered);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader header={header} />

      <View style={{ padding: 20 }}>
        {/* Enter current location */}
      <Text style={styles.label}>Where are you now?</Text>
        <TextInput
          style={styles.input}
          placeholder={userLocation ? `${userLocation}`: 'Enter your location...'}
          placeholderTextColor="gray"
          value={userLocation}
          onChangeText={setUserLocation}
        />
        {/* Enter where you're going */}
        <Text style={styles.label}>Where are you going?</Text>
        <TextInput
          style={styles.input}
          placeholder={destination ? `Searching for '${destination}'...` : 'Enter a destination...'}
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
        />

        {/* When you want to go */}
        <Text style={styles.label}>When are you traveling?</Text>
        <View style={styles.row}>
        <TouchableOpacity 
            style={[
              selectedDate === "Now" ? styles.selectedButton : styles.unselectedButton
            ]}
              onPress={() => setSelectedDate("Now")}
          >
            <Text style={selectedDate === "Now" ? styles.selectedText : styles.unselectedText}>
              Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              selectedDate === "Today" ? styles.selectedButton : styles.unselectedButton
            ]}
              onPress={() => setSelectedDate("Today")}
          >
            <Text style={selectedDate === "Today" ? styles.selectedText : styles.unselectedText}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              selectedDate === "Tomorrow" ? styles.selectedButton : styles.unselectedButton
              ]}
              onPress={() => setSelectedDate("Tomorrow")}
          >
            <Text style={selectedDate === "Tomorrow" ? styles.selectedText : styles.unselectedText}>
              Tomorrow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              selectedDate === "Custom" ? styles.selectedButton : styles.unselectedButton
            ]}
              onPress={() => setSelectedDate("Custom")}
          >
            <Text style={selectedDate === "Custom" ? styles.selectedText : styles.unselectedText}>
              Custom
            </Text>
          </TouchableOpacity>
        </View>

        {/* Request and show available rides */}
        <TouchableOpacity style={styles.findButton} onPress={handleFindTaxiPartners}>
          <Text style={styles.findButtonText}>Find Taxi Partners</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Available Ride Shares ({filteredRideShares.length})</Text>
        {filteredRideShares.length === 0 ? (
          <Text>No available ride shares</Text>
        ) : (
          <FlatList
            data={filteredRideShares}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaxiCard name={item.name} surname={item.surname} seats={item.seats} vehicle={item.vehicle} departTime={item.departTime}/>}
          />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Primary,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: TextDark,
  },
  input: {
    backgroundColor: TextLight,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Secondary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 8, 
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: Primary,
    padding: 8,
    borderRadius: 8,
    flex: 0.4,
  alignItems: 'center',
    marginRight: 1,

  },
  selectedText: {
    fontWeight: 'bold',
    color: TextLight,
    fontSize: 14
  },
  unselectedButton: {
    backgroundColor: TextLight,
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Secondary,
    flex: 0.35,
    alignItems: 'center',
    marginLeft: 1,
  },
  unselectedText: {
    color: TextDark,
    fontSize: 13
  },
  findButton: {
    backgroundColor: Primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  findButtonText: {
    color: TextLight,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Primary,
  },
});
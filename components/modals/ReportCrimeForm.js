import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

// firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ReportCrimeForm({ visible, onClose }) {
    const [crimeTypes, setCrimeTypes] = useState({
        assault: false,
        theft: false,
        vandalism: false,
        harassment: false,
        suspicious: false,
        noise: false,
    });

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState(null);
    const [locationModalVisible, setLocationModalVisible] = useState(false);

    const toggleCheckbox = (key) => {
        setCrimeTypes({ ...crimeTypes, [key]: !crimeTypes[key] });
    };

    const handleLocationPick = () => {
        setLocation({ lat: 53.459, lng: -6.219 }); // example
    };

    const handleSubmit = async () => {
        const selectedCrimes = Object.keys(crimeTypes).filter((key) => crimeTypes[key]);
        const report = {
          types: selectedCrimes,
          description,
          location,
          time: new Date().toISOString(),
        };
      
        try {
          await addDoc(collection(db, 'crimeReports'), report);
          console.log('Report saved:', report);
          setLocation(null);
          setDescription('');
          setCrimeTypes({
            assault: false,
            theft: false,
            vandalism: false,
            harassment: false,
            suspicious: false,
            noise: false,
          });
          onClose();
        } catch (error) {
          console.error('Error submitting report:', error);
        }
      };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.header}>📢 Report a Crime</Text>

                        <Text style={styles.subHeader}>Select Type(s):</Text>
                        {Object.entries(crimeTypes).map(([key, value]) => (
                            <CheckBox
                                key={key}
                                title={key.charAt(0).toUpperCase() + key.slice(1)}
                                checked={value}
                                onPress={() => toggleCheckbox(key)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal' }}
                            />
                        ))}

                        <Text style={styles.subHeader}>Details (optional):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Describe what happened..."
                            multiline
                            value={description}
                            onChangeText={setDescription}
                        />

                        <TouchableOpacity style={styles.locationButton} onPress={handleLocationPick}>
                            <Text style={styles.locationButtonText}>
                                {location ? 'Location Set ✅' : '📍 Use My Location'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit Report</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        maxHeight: '90%',
    },
    content: {
        paddingBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    locationButton: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    locationButtonText: {
        color: '#333',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: '#999',
        fontSize: 16,
    },
});

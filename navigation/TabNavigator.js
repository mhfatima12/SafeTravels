import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import EmergencyScreen from '../screens/EmergencyScreen';
import TaxiShareScreen from '../screens/TaxiShareScreen';
import SafetyScreen from '../screens/SafetyScreen';
import HomeScreen from '../screens/HomeScreen'; 

// icon
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Emergency') {
              iconName = 'warning';
            } else if (route.name === 'Taxi Share') {
              iconName = 'local-taxi';
            } else if (route.name === 'Safety') {
              iconName = 'security';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1D3557',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Emergency" component={EmergencyScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Taxi Share" component={TaxiShareScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Safety" component={SafetyScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
}

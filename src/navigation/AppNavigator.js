import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import TeamsScreen from '../app/Teams';
import PlayersScreen from '../app/Players';
import StandingsScreen from '../app/Standings';
import SplashScreen from '../app/SplashScreen';
import GamesSchedule from '../app/GameSchedule';
import ProfileScreen from '../app/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Teams" component={TeamsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Players" component={PlayersScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const CustomHeaderTitle = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../../assets/HeaderIcon.png')} style={styles.headerIcon} />
    <Text style={styles.headerText}>NBA</Text>
  </View>
);

function MainApp({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: '#2C2C2C',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Teams') iconName = focused ? 'basketball' : 'basketball-outline';
          else if (route.name === 'Standings') iconName = focused ? 'podium' : 'podium-outline';
          else if (route.name === 'Schedule') iconName = focused ? 'calendar' : 'calendar-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#888888',
        headerTitle: () => <CustomHeaderTitle />,
        headerStyle: { backgroundColor: '#1E1E1E' },
        headerTintColor: '#FFFFFF',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={30} color="#FFFFFF" style={styles.profileIcon} />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Teams" component={TeamsStack} options={{ tabBarLabel: 'Tim' }} />
      <Tab.Screen name="Standings" component={StandingsScreen} options={{ tabBarLabel: 'Standings' }} />
      <Tab.Screen name="Schedule" component={GamesSchedule} options={{ tabBarLabel: 'Jadwal' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: '#121212', card: '#1E1E1E', text: '#FFFFFF', border: '#2C2C2C', primary: '#FF6B6B' } }}>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            headerShown: true,
            headerTitle: () => <CustomHeaderTitle />,
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#FFFFFF',
            headerRight: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileIcon: {
    marginRight: 16,
  },
});

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/SplashNBA.png')} 
        style={styles.splashImage}
      />
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.poweredText}>Created by Mario Sianturi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  loadingWrapper: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poweredText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

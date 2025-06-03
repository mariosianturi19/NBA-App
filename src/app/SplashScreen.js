import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <SplashImage source={require('../../assets/SplashNBA.png')} />
      <LoadingWrapper>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <PoweredText>Created by Mario Sianturi</PoweredText>
      </LoadingWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const SplashImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  position: absolute;
`;

const LoadingWrapper = styled.View`
  position: absolute;
  bottom: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PoweredText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

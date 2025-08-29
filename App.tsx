import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import Toast from 'react-native-toast-message';
import { useCameraPermissions } from 'expo-camera';

function AppContent() {
  const { token, isLoading } = useContext(AuthContext);
  const [permission] = useCameraPermissions();

  // Pré-demander la permission caméra au lancement
  /*useEffect(() => {
    const preRequestCameraPermission = async () => {
      try {
        if (permission && !permission.granted) {
          await permission.requestPermission();
        }
      } catch (error) {
        console.error('Erreur de permission caméra:', error);
      }
    };

    preRequestCameraPermission();
  }, [permission]);*/

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
      <Toast />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
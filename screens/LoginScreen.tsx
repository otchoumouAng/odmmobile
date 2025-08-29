import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import LoginForm from '../modules/Auth/components/LoginForm';
import { Styles } from '../styles/styles';

export default function LoginScreen() {
  const { login, isLoading } = useContext(AuthContext);

  return (
    <View style={Styles.container}>
      <LoginForm onLogin={login} isLoading={isLoading} />
    </View>
  );
}
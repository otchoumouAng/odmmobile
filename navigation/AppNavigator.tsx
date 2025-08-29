import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { House, User, Gear, Users, Package, ShoppingCart } from 'phosphor-react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ClientTable from '../modules/Client/components/ClientTable';
import Palette from '../screens/Palette';
import OrderPlaceholder from '../screens/OrderPlaceholder';
import { Colors } from '../styles/styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerTitle: 'Modules' }}
      />
      <Stack.Screen 
        name="Clients" 
        component={ClientTable} 
        options={{ headerTitle: 'Gestion des clients' }}
      />
      <Stack.Screen 
        name="Palette" 
        component={Palette} 
        options={{ headerTitle: 'Palette' }}
      />
      <Stack.Screen 
        name="Orders" 
        component={OrderPlaceholder} 
        options={{ headerTitle: 'Commandes' }}
      />
    </Stack.Navigator>
  );
}

// Composant pour les icônes de tab
const TabBarIcon = ({ icon: Icon, color, size }: { icon: React.ComponentType<any>, color: string, size: number }) => {
  return <Icon size={size} color={color} />;
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent: React.ComponentType<any>;
          
          if (route.name === 'Accueil') IconComponent = House;
          else if (route.name === 'Profil') IconComponent = User;
          else if (route.name === 'Paramètres') IconComponent = Gear;
          else IconComponent = House;
          
          return <TabBarIcon icon={IconComponent} color={color} size={size} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
      })}
    >
      <Tab.Screen 
        name="Accueil" 
        component={HomeStack} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Paramètres" 
        component={SettingsScreen} 
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
}
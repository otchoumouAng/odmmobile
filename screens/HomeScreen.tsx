import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Users, Package, ShoppingCart } from 'phosphor-react-native';
import { Styles, Colors, Spacing, Typography } from '../styles/styles';

const modules = [
  { id: 'clients', title: 'Clients', icon: Users, screen: 'Clients' },
  { id: 'palette', title: 'Palette', icon: Package, screen: 'Palette' },
  { id: 'orders', title: 'Commandes', icon: ShoppingCart, screen: 'Orders' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={Styles.container}>
      <Text style={[Typography.h1, { padding: Spacing.lg }]}>Modules</Text>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[
              Styles.card, 
              { 
                width: '40%', 
                alignItems: 'center',
                margin: Spacing.sm 
              }
            ]}
            onPress={() => navigation.navigate(module.screen as never)}
            accessibilityLabel={`Ouvrir le module ${module.title}`}
          >
            <module.icon size={32} color={Colors.primary} />
            <Text style={{ marginTop: Spacing.sm, textAlign: 'center' }}>
              {module.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
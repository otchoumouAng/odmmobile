import React from 'react';
import { View, Text } from 'react-native';
import { Styles, Spacing,Typography } from '../styles/styles';

export default function OrderPlaceholder() {
  return (
    <View style={[Styles.container, { padding: Spacing.lg }]}>
      <Text style={Typography.h2}>Module Commande</Text>
      <Text style={{ marginTop: Spacing.md }}>Ce module est en cours de développement</Text>
    </View>
  );
}
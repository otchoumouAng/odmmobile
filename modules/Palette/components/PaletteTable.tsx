import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Palette } from '../types';
import { Styles, Colors, Spacing, Typography } from '../../../styles/styles';

interface PaletteTableProps {
  data: Palette[];
  onRefresh: () => void;
  isLoading: boolean;
  isRefreshing: boolean;
  onRowDoubleClick: (paletteId: string) => void;
}

// Composant séparé pour gérer le double-clic
const PaletteRow = ({ item, onDoubleClick }: { item: Palette; onDoubleClick: (id: string) => void }) => {
  let lastTap: number | null = null;

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      onDoubleClick(item.id);
      lastTap = null;
    } else {
      lastTap = now;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[Styles.card, { marginVertical: Spacing.xs }]}>
        <Text style={[Typography.h2, { marginBottom: Spacing.xs }]}>{item.nomProduit}</Text>
        <Text style={Typography.body}>Référence: {item.codeArticle}</Text>
        <Text style={Typography.body}>Production: {item.numeroProduction}</Text>
        <Text style={Typography.body}>Palette: {item.numeroPalette}</Text>
        <Text style={[Typography.body, { color: item.statut === 'DC' ? Colors.success : Colors.warning }]}>
          Statut: {item.statut}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PaletteTable({ data, onRefresh, isLoading, isRefreshing, onRowDoubleClick }: PaletteTableProps) {
  const renderItem = ({ item }: { item: Palette }) => (
    <PaletteRow item={item} onDoubleClick={onRowDoubleClick} />
  );

  if (isLoading && !isRefreshing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: Spacing.md }}>Chargement des palettes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: Spacing.md }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
        />
      }
      ListEmptyComponent={
        <View style={{ alignItems: 'center', padding: Spacing.xl }}>
          <Text style={Typography.body}>Aucune palette disponible</Text>
        </View>
      }
    />
  );
}
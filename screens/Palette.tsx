import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Palette } from '../modules/Palette/types';
import { Styles } from '../styles/styles';
import PaletteScannerButton from '../modules/Palette/components/PaletteScannerButton';
import PaletteTable from '../modules/Palette/components/PaletteTable';
import ProModal from '../modules/Palette/components/ProModal';
import Toast from 'react-native-toast-message';

// Import de l'API
import { paletteApi } from '../modules/Palette/routes';

export default function PaletteScreen() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadPalettes = useCallback(async () => {
    try {
      setError(null);
      const data = await paletteApi.getPalettes();
      setPalettes(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des palettes:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setError(errorMessage);
      setPalettes([]);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadPalettes();
    setIsRefreshing(false);
  }, [loadPalettes]);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await loadPalettes();
      setIsLoading(false);
    };

    initializeData();
  }, [loadPalettes]);

  const handleScanSuccess = useCallback((scannedId: string) => {
    setSelectedPaletteId(scannedId);
    setIsModalVisible(true);
  }, []);

  

  const handleDeclarePalette = useCallback(async (paletteId: string) => {
    try {
      await paletteApi.updatePaletteByCode(paletteId);
      Toast.show({
        type: 'success',
        text1: 'Succès',
        text2: 'Palette déclarée avec succès',
      });
      loadPalettes();
      return true;
    } catch (error) {
      console.error('Erreur lors de la déclaration:', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Échec de la déclaration de la palette',
      });
      throw error;
    }
  }, [loadPalettes]);

  const handleRowDoubleClick = useCallback((paletteId: string) => {
    setSelectedPaletteId(paletteId);
    setIsModalVisible(true);
  }, []);

  if (isLoading && !isRefreshing) {
    return (
      <View style={[Styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 16 }}>Chargement des palettes...</Text>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <PaletteScannerButton onScanSuccess={handleScanSuccess} />
      
      {error && (
        <View style={{ padding: 16, backgroundColor: '#fff3cd', margin: 16, borderRadius: 8 }}>
          <Text style={{ color: '#856404', textAlign: 'center' }}>
            Erreur de chargement: {error}
          </Text>
        </View>
      )}
      
      <PaletteTable
        data={palettes}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRowDoubleClick={handleRowDoubleClick}
      />

      <ProModal
        visible={isModalVisible}
        paletteId={selectedPaletteId}
        onClose={() => setIsModalVisible(false)}
        onDeclare={handleDeclarePalette}
        paletteApi={paletteApi}
      />
      
      <Toast />
    </View>
  );
}
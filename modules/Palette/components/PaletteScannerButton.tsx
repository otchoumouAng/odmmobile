import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Alert, 
  Modal, 
  View, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
  Linking 
} from 'react-native';
import { Camera } from 'phosphor-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Styles, Colors, Spacing } from '../../../styles/styles';

interface PaletteScannerButtonProps {
  onScanSuccess: (scannedId: string) => void;
}

export default function PaletteScannerButton({ onScanSuccess }: PaletteScannerButtonProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScanPress = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permission requise',
          'L\'accès à la caméra est nécessaire pour scanner les codes palettes.',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Ouvrir paramètres', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }
    }
    setIsScanning(true);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setIsScanning(false);
    onScanSuccess(data);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          Styles.buttonPrimary, 
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: Spacing.md,
          }
        ]}
        onPress={handleScanPress}
        accessibilityLabel="Scanner une palette"
      >
        <Camera size={20} color={Colors.card} style={{ marginRight: Spacing.sm }} />
        <Text style={Styles.textButton}>Scanner une palette</Text>
      </TouchableOpacity>

      <Modal
        visible={isScanning}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setIsScanning(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
          />
          
          <View style={styles.overlay}>
            <View style={styles.focusBox} />
            <Text style={styles.instruction}>Alignez le code dans le cadre</Text>
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsScanning(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  focusBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  instruction: {
    position: 'absolute',
    bottom: 100,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { CheckCircle, X, Info } from 'phosphor-react-native';
import { Styles, Colors, Spacing, Typography } from '../../../styles/styles';

interface ProModalProps {
  visible: boolean;
  paletteId: string | null;
  onClose: () => void;
  onDeclare: (paletteId: string) => void;
  paletteApi: any;
}

export default function ProModal({ visible, paletteId, onClose, onDeclare, paletteApi }: ProModalProps) {
  const [palette, setPalette] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [declaring, setDeclaring] = useState(false);

  useEffect(() => {
    if (visible && paletteId) {
      loadPaletteDetails();
    } else {
      setPalette(null);
    }
  }, [visible, paletteId]);

  const loadPaletteDetails = async () => {
    setLoading(true);
    try {
      const data = await paletteApi.getPalette(paletteId);
      setPalette(data);
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error);
    } finally {
      setLoading(false);
    }
  };

  /*const handleDeclare = async () => {
    if (!paletteId) return;
    
    setDeclaring(true);
    try {
      await onDeclare(paletteId);
    } finally {
      setDeclaring(false);
    }
  };*/

  const handleDeclare = async () => {
    if (!paletteId) return;
    
    setDeclaring(true);
    try {
      await onDeclare(paletteId);
      // Fermer le modal seulement si la déclaration réussit
      onClose();
    } catch (error) {
      // Ne pas fermer le modal en cas d'erreur
      console.error('Erreur lors de la déclaration:', error);
    } finally {
      setDeclaring(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Détails de la Palette</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={{ marginTop: Spacing.md }}>Chargement des détails...</Text>
            </View>
          ) : palette ? (
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Info size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Informations générales</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Nom du produit:</Text>
                  <Text style={styles.detailValue}>{palette.nomProduit}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Référence:</Text>
                  <Text style={styles.detailValue}>{palette.codeArticle}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Type:</Text>
                  <Text style={styles.detailValue}>{palette.typeProduit}</Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Info size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Production</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>N° de production:</Text>
                  <Text style={styles.detailValue}>{palette.numeroProduction}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>N° de palette:</Text>
                  <Text style={styles.detailValue}>{palette.numeroPalette}</Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Info size={20} color={Colors.primary} />
                  <Text style={styles.sectionTitle}>Statut</Text>
                </View>
                
                <View style={[
                  styles.statusIndicator, 
                  { backgroundColor: palette.statut === 'DC' ? Colors.successLight : Colors.warningLight }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: palette.statut === 'DC' ? Colors.success : Colors.warning }
                  ]}>
                    {palette.statut === 'DC' ? 'Déjà déclarée' : 'En attente de déclaration'}
                  </Text>
                </View>
                
                {palette.dateDeclaration && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date déclaration:</Text>
                    <Text style={styles.detailValue}>{formatDate(palette.dateDeclaration)}</Text>
                  </View>
                )}
                
                {palette.modificationDate && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Dernière modification:</Text>
                    <Text style={styles.detailValue}>{formatDate(palette.modificationDate)}</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={Typography.body}>Impossible de charger les détails de la palette</Text>
            </View>
          )}

          {palette && palette.statut !== 'DC' && (
            <TouchableOpacity
              style={[Styles.buttonPrimary, styles.declareButton, declaring && styles.buttonDisabled]}
              onPress={handleDeclare}
              disabled={declaring}
            >
              {declaring ? (
                <ActivityIndicator size="small" color={Colors.card} style={{ marginRight: Spacing.sm }} />
              ) : (
                <CheckCircle size={20} color={Colors.card} style={{ marginRight: Spacing.sm }} />
              )}
              <Text style={Styles.textButton}>
                {declaring ? 'Déclaration...' : 'Déclarer La Palette'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  scrollContainer: {
    maxHeight: 400,
  },
  loadingContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
    color: Colors.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: Spacing.md,
  },
  statusIndicator: {
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  declareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
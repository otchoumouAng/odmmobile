import axios from 'axios';
import { baseUrl } from '../../config';
import { Palette } from './types';

export const paletteApi = {
  getPalettes: async (): Promise<Palette[]> => {
    try {
      const response = await axios.get(`${baseUrl}/palette`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des palettes:', error);
      throw error;
    }
  },

  getPalette: async (id: string): Promise<Palette> => {
    try {
      const response = await axios.get(`${baseUrl}/palette/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la palette:', error);
      throw error;
    }
  },

  updatePaletteByCode: async (id: string): Promise<Palette> => {
    try {
      // D'abord, récupérer les données actuelles de la palette
      const currentPalette = await axios.get(`${baseUrl}/palette/${id}`);
      
      // Préparer les données pour la mise à jour
      const updatedData = {
        ...currentPalette.data,
        statut: 'DC',
        dateDeclaration: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        modificationUtilisateur: 'admin' 
      };

      // Envoyer la requête PUT avec les données dans le corps
      const response = await axios.put(`${baseUrl}/palette/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la palette:', error);
      throw error;
    }
  },


  createMouvementStock: async (palette: Palette): Promise<MouvementStock> => {
    try {
      // Map the Palette object to a new MouvementStock object for creation
      const newMouvement = {
        codeMagasin: palette.codeMagasin,
        date: new Date().toISOString(),
        codePalette: palette.id, // Use the palette's ID for the CodePalette field
        processID: null,
        codeTypeMouvement: 1, // Business rule: '1' could mean 'Entry from Declaration'
        sens: 1, // '1' for stock entry (inflow)
        codeConditionnement: palette.codeConditionnement,
        codeReferenceConditionnement: palette.codeReferenceConditionnement,
        nbreUniteParPalette: palette.nbreUniteParPalette,
        uniteDePoids: palette.uniteDePoids,
        poidsBrutUnitaire: palette.poidsBrutUnitaire,
        tareUnitaireEmballage: palette.tareUnitaireEmballage,
        poidsBrutPalette: palette.poidsBrutPalette,
        tareEmballagePalette: palette.tareEmballagePalette,
        poidsNetPalette: palette.poidsNetPalette,
        statut: 'DC', 
        creationUtilisateur: 'admin',
      };

      // Send the POST request to the mouvement_stock endpoint
      const response = await axios.post(`${baseUrl}/mouvement_stock`, newMouvement, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du mouvement de stock:', error);
      throw error;
    }
  },



};

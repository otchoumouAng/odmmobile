import axios from 'axios';
import { baseUrl } from '../../config';
import { Palette, Production, MouvementStock } from './types';

const getPalettes = async (): Promise<Palette[]> => {
    try {
      const response = await axios.get(`${baseUrl}/palette`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des palettes:', error);
      throw error;
    }
};

const getPalette = async (id: string): Promise<Palette> => {
    try {
      const response = await axios.get(`${baseUrl}/palette/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la palette:', error);
      throw error;
    }
};

const getProduction = async (id: string): Promise<Production> => {
    try {
      const response = await axios.get(`${baseUrl}/production/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la production:', error);
      throw error;
    }
};

const createMouvementStock = async (palette: Palette, production: Production): Promise<MouvementStock> => {
    try {
      // Map the Palette object to a new MouvementStock object for creation
      const newMouvement = {
        codeMagasin: palette.codeMagasin,
        date: new Date().toISOString(),
        codePalette: palette.id,
        processID: production.id,
        codeTypeMouvement: 1,
        sens: 1,
        codeConditionnement: production.conditionnementCode || 0,
        codeReferenceConditionnement: String(production.conditionnementRefCode),
        nbreUniteParPalette: production.nbreUniteParPalette || 0,
        uniteDePoids: String(production.uniteDePoids),
        poidsBrutUnitaire: production.poidsBrutUnitaire || 0,
        tareUnitaireEmballage: production.tareUnitaireEmballage || 0,
        poidsBrutPalette: production.poidsBrutPalette || 0,
        tareEmballagePalette: production.tareEmballagePalette || 0,
        poidsNetPalette: production.poidsNetPalette || 0,
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
};

const updatePaletteByCode = async (id: string): Promise<Palette> => {
    try {
      // First, get the current palette data
      const { data: currentPalette } = await axios.get<Palette>(`${baseUrl}/palette/${id}`);

      // Prepare the data for the update
      const updatedData = {
        ...currentPalette,
        statut: 'DC',
        dateDeclaration: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        modificationUtilisateur: 'admin'
      };

      // Send the PATCH request with the data in the body
      const { data: updatedPalette } = await axios.patch<Palette>(`${baseUrl}/palette/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Create stock movement
      if (updatedPalette && updatedPalette.productionID) {
        const production = await getProduction(updatedPalette.productionID);
        if (production) {
          await createMouvementStock(updatedPalette, production);
        }
      }

      return updatedPalette;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la palette:', error);
      throw error;
    }
};

export const paletteApi = {
  getPalettes,
  getPalette,
  updatePaletteByCode,
  getProduction,
  createMouvementStock,
};

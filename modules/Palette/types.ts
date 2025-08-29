export interface Palette {
  id: string;
  productionID: string;
  numeroProduction: string;
  numeroPalette: number;
  nomProduit: string;
  typeProduit: string;
  nomArticle: string;
  codeArticle: string;
  statut: string;
  dateDeclaration: datetime;
  rowVersionKey?: number[];
  creationUtilisateur?: string;
  modificationUtilisateur: string;
  modificationDate: datetime;
}



export interface MouvementStock {
  id?: string;

  codeMagasin: number;
  date: Date;
  codePalette: string;
  processID?: string;
  codeTypeMouvement: number;
  sens: number;

  codeConditionnement: number;
  codeReferenceConditionnement: string;
  nbreUniteParPalette: number;

  uniteDePoids: string;
  poidsBrutUnitaire: number;
  tareUnitaireEmballage: number;
  poidsBrutPalette: number;
  tareEmballagePalette: number;
  poidsNetPalette: number;

  statut?: string;

  rowVersionKey?: number[]; 
  creationUtilisateur: string;
  creationDate?: Date;
  modificationUtilisateur?: string;
  modificationDate?: Date;
}



export interface Production {
    id: string;
    articleCode: string;
    articleDesignation: string;
    conditionnementCode: number | null;
    conditionnementDesignation: string;
    produitCode: number | null;
    produitDesignation: string;
    typeProduitCode: number | null;
    typeProduitDesignation: string;
    conditionnementRefCode: number | null;
    nbreUniteParPalette: number | null;
    uniteDePoids: string;
    poidsBrutUnitaire: number | null;
    tareUnitaireEmballage: number | null;
    poidsBrutPalette: number | null;
    tareEmballagePalette: number | null;
    poidsNetPalette: number | null;
    bestBeforeDate: number | null;
    annee: number;
    semaine: number;
    ligneProductionCode: number;
    ligneProductionDesignation: string;
    numeroProduction: string;
    referenceExterne: string;
    recolteCode: number;
    recolteDesignation: string;
    clientCode: number;
    clientNom: string;
    nombrePaletteAProduire: number;
}




export interface ScanResult {
  type: string;
  data: string;
}
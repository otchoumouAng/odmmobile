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


const testMouvementStock: MouvementStock = {  
  codeMagasin: 101,
  date: new Date("2025-08-28T14:00:00Z"),
  codePalette: "3fcb2e3f-78e9-45d4-a8dc-4e951fa3b6d7",
  processID: null,
  codeTypeMouvement: 1, 
  sens: 1,              
  codeConditionnement: 12,
  codeReferenceConditionnement: "REF-ABC-2025",
  nbreUniteParPalette: 50,
  uniteDePoids: "kg",
  poidsBrutUnitaire: 60.5,
  tareUnitaireEmballage: 1.2,
  poidsBrutPalette: 3025,
  tareEmballagePalette: 60,
  poidsNetPalette: 2965,
  statut: "VL",
  rowVersionKey: [0, 0, 0, 0, 0, 0, 3, 245], 
  creationUtilisateur: "jdoe",
};


/*export interface MouvementStock {
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
}*/


export interface ScanResult {
  type: string;
  data: string;
}
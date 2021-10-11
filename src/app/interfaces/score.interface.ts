export const dbName_Score = 'scores';

export interface Score {
  uid: string;
  scores: Scores;
}

export interface Scores {
  ahorcado: number;
  mayoromenor: number;
  preguntados: number;
  sopadeletras: number;
}

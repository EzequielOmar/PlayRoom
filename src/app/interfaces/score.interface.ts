export interface Scores {
  ahorcado: number;
  mayoromenor: number;
  preguntados: number;
  sopadeletras: number;
  total: number;
}

export interface Score {
  uid: string;
  scores: Scores;
}

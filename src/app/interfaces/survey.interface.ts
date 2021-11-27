export interface Survey {
  name: string;
  lastName: string;
  birthDate: string; //{day:number,month:number,year:number}
  cell: string; //8 a 14 nros
  country: string;
  fav_game: string; //nombre del juego
  daysPerWeek: number; //1 a 7
  hoursPerDay: string; //0.25 a 8 hs al dia
  suggestion: string; //mensaje opcional
}

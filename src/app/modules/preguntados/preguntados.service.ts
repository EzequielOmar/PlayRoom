import { Injectable } from '@angular/core';
import { Question } from './pregunta';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private trivia: string = 'https://opentdb.com/api.php?';

  constructor() {}

  /**
   * Hace tres llamados a la api opentdb a modo de obtener
   * 3 preguntas faciles, 3 medianas, 3 dificiles de tema random (toca mucho entretenimiento)
   * agrega la respuesta correcta, al array de respuestas incorrectas, y desordena el array
   * (a modo de mostrarlas sin saber cual es la correcta)
   * @returns array con las 9 preguntas y respuestas ordenadas de facil a dificil. o lanza error.
   */
  getQuestions = async () => {
    let questions: Array<Question> = [];
    try {
      let easy = await fetch(
        this.trivia + 'amount=3&difficulty=easy&type=multiple'
      );
      let medium = await fetch(
        this.trivia + 'amount=3&difficulty=medium&type=multiple'
      );
      let hard = await fetch(
        this.trivia + 'amount=3&difficulty=hard&type=multiple'
      );
      let aux = await easy.json();
      questions.push(...aux.results);
      aux = await medium.json();
      questions.push(...aux.results);
      aux = await hard.json();
      questions.push(...aux.results);
      questions.forEach(q => {
        q.question = q.question.replace(/&quot;/g,'"').replace(/&#039;/g,'`').replace(/&ouml;/g,'ö').replace(/&eacute;/g,'è');
        q.incorrect_answers.push(q.correct_answer);
        q.incorrect_answers = this.shuffle(q.incorrect_answers);
      });
    } catch (error) {
      console.log(error);
      throw new Error('Lo siento, error interno, refresque la página.');
    }
    return questions;
  };

  private shuffle(array:Array<any>):Array<any>{
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}

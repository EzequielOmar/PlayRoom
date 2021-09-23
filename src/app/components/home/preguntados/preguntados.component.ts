import { Component, OnInit } from '@angular/core';
import { scores } from '../game.constants';
import { Question } from './pregunta';
import { PreguntadosService } from './preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit {
  private questions: Array<Question> = [];
  options: Array<string> = ['A', 'B', 'C', 'D'];
  questionNro: number = 0;
  currentQuestion: Question | null = null;
  error: string = '';
  playing: Boolean = false;
  win: Boolean = false;
  lost: Boolean = false;
  ready: Boolean = false;
  guess: Boolean = false;
  scores: Array<any> = JSON.parse(JSON.stringify(scores));
  constructor(private trivia: PreguntadosService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  startGame() {
    if (this.win || this.lost) {
      this.initialice();
      this.getQuestions();
    }
    setTimeout(() => {
      this.playing = true;
      this.setNextQuestion();
    }, 500);
  }

  try(option: string) {
    if (this.win || this.lost) {
      this.error = 'El juego terminó. ¡Intentelo de nuevo!';
      return;
    }
    this.check(option);
  }

  next() {
    this.guess = false;
    this.setNextQuestion();
  }

  private initialice() {
    this.ready = false;
    this.questionNro = 0;
    this.currentQuestion = null;
    this.error = '';
    this.playing = false;
    this.win = false;
    this.lost = false;
    this.guess = false;
    this.scores = JSON.parse(JSON.stringify(scores));
  }

  /**
   *Consigue las 9 preguntas del juego o muestra error
   */
  private getQuestions() {
    this.trivia
      .getQuestions()
      .then((res) => {
        this.questions = [];
        this.questions.push(...res);
        this.ready = true;
      })
      .catch((e) => {
        this.error = e.message;
      });
  }

  private setNextQuestion() {
    this.scores[this.questionNro].current = true;
    this.currentQuestion = this.questions[this.questionNro];
    this.questionNro++;
  }

  private check(option: string) {
    if (this.guess) {
      this.error = 'Lo siento, ya arriesgó, no puede cambiar su desición.';
      return;
    }
    this.guess = true;
    if (option === this.currentQuestion?.correct_answer) {
      if (this.questionNro === this.questions.length) {
        this.win = true;
        return;
      }
    } else {
      this.lost = true;
    }
    this.updateDom(option);
  }

  private updateDom(option: string) {
    //score list
    if (this.questionNro != 0 && !this.lost) {
      this.scores[this.questionNro - 1].earned = true;
      this.scores[this.questionNro - 1].current = false;
    }
    if (this.lost) {
      this.scores[this.questionNro].current = false;
    }
    //options
    let $divs = Array.from(document.getElementsByClassName('question'));
    //console.log($divs[0].lastElementChild?.innerHTML);
    $divs.forEach((d) => {
      if (
        d.lastElementChild?.innerHTML === this.currentQuestion?.correct_answer
      ) {
        d.classList.add('success');
      } else if (d.lastElementChild?.innerHTML === option && this.lost) {
        d.classList.add('error');
      } else {
        d.className = 'box';
      }
    });
  }
}

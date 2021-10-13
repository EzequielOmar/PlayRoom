import { Component, ViewChild } from '@angular/core';
import { ScoreComponent } from '../shared/score/score.component';
import { TimerComponent } from '../shared/timer/timer.component';
import { scores, timePreguntados } from './constants';
import { Question } from './pregunta';
import { PreguntadosService } from './preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent {
  gamename: string = 'preguntados';
  @ViewChild(TimerComponent) countDown: TimerComponent = new TimerComponent();
  @ViewChild(ScoreComponent) score!: ScoreComponent;
  private questions: Array<Question> = [];
  options: Array<string> = ['A', 'B', 'C', 'D'];
  questionNro: number = 0;
  counter: number = 0;
  currentQuestion: Question | null = null;
  playing: Boolean = false;
  correct: Boolean = false;
  win: Boolean = false;
  lost: Boolean = false;
  guess: Boolean = false;
  error: string = '';
  scores: Array<any> = JSON.parse(JSON.stringify(scores));
  constructor(private trivia: PreguntadosService) {}

  startGame() {
    this.getQuestions().then(() => {
      this.initialice();
      this.playing = true;
      this.setNextQuestion();
    });
  }

  try(option: string) {
    if (this.win || this.lost) {
      this.error = 'El juego terminó. ¡Intentelo de nuevo!';
      return;
    }
    this.countDown.stop();
    this.check(option);
    this.handleScore();
  }

  next() {
    this.guess = false;
    this.countDown.start();
    this.setNextQuestion();
  }

  timeOut() {
    this.error = 'Se terminó el tiempo';
    this.lost = true;
    this.countDown.stop();
  }

  cancel() {
    if (this.win || this.lost) {
      this.playing = false;
      return;
    }
    if (confirm('¿Seguro? Perderás los puntos acumulados.'))
      this.playing = false;
  }

  private initialice() {
    this.questionNro = 0;
    this.currentQuestion = null;
    this.error = '';
    this.playing = false;
    this.win = false;
    this.lost = false;
    this.guess = false;
    this.scores = JSON.parse(JSON.stringify(scores));
    this.counter = timePreguntados;
    // this.score.lostCurrentGameScore;
    //start counter
    setTimeout(() => {
      this.countDown.start();
    }, 500);
  }

  /**
   *Consigue las 9 preguntas del juego o muestra error
   */
  private getQuestions = async () =>
    await this.trivia
      .getQuestions()
      .then((res) => {
        this.questions = [];
        this.questions.push(...res);
      })
      .catch((e) => {
        this.error = e.message;
      });

  private setNextQuestion() {
    this.scores[this.questionNro].current = true;
    this.currentQuestion = this.questions[this.questionNro];
    this.questionNro++;
  }

  private check(option: string) {
    if (this.guess) {
      this.error =
        'Su respuesta es correcta. Presione la flecha y continúe el juego.';
      return;
    }
    this.guess = true;
    if (option === this.currentQuestion?.correct_answer) {
      //correcta
      this.runCorrectAnimation();
      if (this.questionNro === this.questions.length)
        //ganador
        this.win = true;
    }
    //error perdió
    else this.lost = true;
    this.updateDom(option);
  }

  private handleScore() {
    if (this.lost) {
      this.score.lostCurrentGameScore();
      return;
    }
    this.score.updateCurrentGameScore(this.scores[this.questionNro - 1].score);
    if (this.scores[this.questionNro - 1].savePoint)
      this.score.saveTotalAndGameScore();
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

  runCorrectAnimation() {
    this.correct = true;
    setTimeout(() => {
      this.correct = false;
    }, 2000);
  }
}

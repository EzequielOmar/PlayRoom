import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ScoreComponent } from '../shared/score/score.component';
import { TimerComponent } from '../shared/timer/timer.component';
import {
  bonusGuessedWord,
  multiplierWordLengthScore,
  timeSoup,
  words,
  wordsBySoup,
} from './constants';
declare var WordFind: any;

@Component({
  selector: 'app-sopadeletras',
  templateUrl: './sopadeletras.component.html',
  styleUrls: ['./sopadeletras.component.scss'],
})
export class SopadeletrasComponent {
  gamename: string = 'sopadeletras';
  @ViewChild('soupContainer') soupContainer?: ElementRef;
  @ViewChild(TimerComponent) countDown: TimerComponent = new TimerComponent();
  @ViewChild(ScoreComponent) score!: ScoreComponent;
  soup: Array<Array<string>> | null = null;
  words: Array<string> = [];
  guessedWords: Array<string> = [];
  dragElements: Array<ElementRef<any>> = [];
  dragWord: string = '';
  win: Boolean = false;
  lost: Boolean = false;
  playing: Boolean = false;
  stop: Boolean = false;
  counter: number = timeSoup;
  constructor(private renderer: Renderer2) {}

  startGame() {
    this.initialice();
    this.soup = this.getSoup();
    this.playing = true;
  }

  gameOver() {
    this.lost = true;
    this.countDown.stop();
    this.saveScore();
  }

  cancel() {
    if (this.win || this.lost) {
      this.playing = false;
      return;
    }
    if (confirm('¿Seguro? Perderás los puntos acumulados.'))
      this.playing = false;
  }

  pause() {
    this.stop ? this.countDown.unpause() : this.countDown.stop();
    this.stop = !this.stop;
  }

  /**
   * Carga el array dragElements con los divs correspondientes a las letras seleccionadas
   * @param i fila
   * @param j columna
   */
  drag(i: number, j: number) {
    let dragCell = this.soupContainer?.nativeElement.children[i].children[j];
    dragCell.classList.add('selected');
    if (!this.dragElements.includes(dragCell)) this.dragElements.push(dragCell);
  }

  /**
   * Maneja la palabra seleccionada (si es acierto o no)
   * y modifica las clases del dom correspondientes
   */
  drop() {
    //borra la palabra anterior
    this.dragWord = '';
    //saca la clase seleccionado y obtiene palabra
    this.dragElements.forEach((e: any) => {
      this.renderer.removeClass(e, 'selected');
      this.dragWord += e.innerText;
    });
    //chequea si la palabra es correcta, y luego si el juego terminó
    if (this.checkWord())
      if (this.words.length === 0) {
        this.win = true;
        this.saveScore();
      }
    //vacía el array de divs seleccionados
    this.dragElements = [];
  }

  private initialice() {
    this.soup = null;
    this.words = [];
    this.guessedWords = [];
    this.dragElements = [];
    this.dragWord = '';
    this.win = false;
    this.lost = false;
    this.playing = false;
    this.counter = timeSoup;
    this.stop = false;
    //start counter
    setTimeout(() => {
      this.countDown.start();
    }, 500);
  }

  private getSoup(): Array<Array<string>> {
    this.words = this.getRandomWords();
    let puzzle = WordFind().newPuzzle(this.words, {
      height: 15,
      width: 10,
      fillBlanks: true,
      orientations: [
        'horizontal',
        'horizontalBack',
        'vertical',
        'verticalUp',
        'diagonal',
        'diagonalBack',
        'diagonalUp',
        'diagonalUpBack',
      ],
    });
    return puzzle;
  }

  private getRandomWords(): Array<string> {
    let sortArray = words;
    return sortArray.sort((a, b) => 0.5 - Math.random()).slice(0, wordsBySoup);
  }

  private checkWord(): Boolean {
    let index = this.words.indexOf(this.dragWord.toLowerCase());
    if (index != -1) {
      this.correct(index);
    } else {
      this.incorrect();
    }
    return index != -1;
  }

  /**
   * guarda la palabra adivinada en guessedWords
   * remueve la plabra adivinada de words
   * actualiza las clases del DOM
   * suma bonusGuessedWord al timer
   * suma el score al acumulado del juego
   * @param index index de la palabra encontrada en el aray words (chequeada distinta de -1)
   */
  private correct(index: number) {
    this.guessedWords.push(this.dragWord.toLowerCase());
    this.words.splice(index, 1);
    this.dragElements.forEach((e: any) => {
      this.renderer.addClass(e, 'correct');
    });
    this.countDown.addSeconds(bonusGuessedWord);
    this.score.updateCurrentGameScore(
      this.dragWord.length * multiplierWordLengthScore
    );
  }

  /**
   * Actualiza la clases del DOM marcando la palabra en rojo por unos segundos
   */
  private incorrect() {
    this.dragElements.forEach((e: any) => {
      this.renderer.addClass(e, 'error');
      setTimeout(() => {
        this.renderer.removeClass(e, 'error');
      }, 500);
    });
  }

  private saveScore() {
    setTimeout(() => {
      this.score.saveTotalAndGameScore();
    }, 2000);
  }
}

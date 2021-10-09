import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { bonusGuessedWord, timeSoup, words, wordsBySoup } from './constants';
declare var WordFind: any;

@Component({
  selector: 'app-sopadeletras',
  templateUrl: './sopadeletras.component.html',
  styleUrls: ['./sopadeletras.component.scss'],
})
export class SopadeletrasComponent implements OnInit {
  @ViewChild('soupContainer') soupContainer?: ElementRef;
  soup: Array<Array<string>> | null = null;
  words: Array<string> = [];
  guessedWords: Array<string> = [];
  dragElements: Array<ElementRef<any>> = [];
  dragWord: string = '';
  win: Boolean = false;
  lost: Boolean = false;
  ready: Boolean = false;
  playing: Boolean = false;
  countDown?: Subscription;
  counter: number = timeSoup;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.soup = this.getSoup();
  }

  startGame() {
    if (this.win || this.lost) {
      this.initialice();
      this.soup = this.getSoup();
    }
    setTimeout(() => {
      this.playing = true;
      //start counter
      this.countDown = timer(1000, 1000).subscribe(() => --this.counter);
    }, 500);
  }

  gameOver() {
    this.lost = true;
  }

  cancel() {
    this.playing = false;
  }

  /**
   * Carga el array dragElements con los divs correspondientes a las letras seleccionadas
   * @param i fila
   * @param j columna
   */
  drag(i: number, j: number) {
    let dragCell = this.soupContainer?.nativeElement.children[i].children[j];
    dragCell.classList.add('selected');
    if (!this.dragElements.includes(dragCell)) {
      this.dragElements.push(dragCell);
    }
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
    if (this.checkWord()) {
      if (this.gameEnd()) {
        this.win = true;
      }
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
    this.ready = false;
    this.playing = false;
    this.counter = timeSoup;
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
    this.ready = true;
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
   * @param index index de la palabra encontrada en el aray words (chequeada distinta de -1)
   */
  private correct(index: number) {
    this.guessedWords.push(this.dragWord.toLowerCase());
    this.words.splice(index, 1);
    this.dragElements.forEach((e: any) => {
      this.renderer.addClass(e, 'correct');
    });
    this.counter += bonusGuessedWord;
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

  private gameEnd(): Boolean {
    return this.words.length === 0;
  }
}

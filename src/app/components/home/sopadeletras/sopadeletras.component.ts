import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { words, wordsBySoup } from '../game.constants';
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

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.soup = this.getSoup();
  }

  drag(i: number, j: number) {
    //recolecta todos los divs que se seleccionan
    let dragCell = this.soupContainer?.nativeElement.children[i].children[j];
    dragCell.classList.add('selected');
    if (!this.dragElements.includes(dragCell)) {
      this.dragElements.push(dragCell);
    }
  }

  drop() {
    //borra la palabra anterior
    this.dragWord = '';
    //saca la clase seleccionado
    this.dragElements.forEach((e: any) => {
      this.renderer.removeClass(e, 'selected');
      this.dragWord += e.innerText;
    });
    //chequea si la palabra es correcta
    let index = this.words.indexOf(this.dragWord.toLowerCase());
    if (index != -1) {
      alert('correcto');
      this.guessedWords.push(this.dragWord.toLowerCase());
      this.words.slice(index, 1);

      this.dragElements.forEach((e: any) => {
        this.renderer.addClass(e, 'correct');
      });
    } else {
      alert('nopopo');

      this.dragElements.forEach((e: any) => {
        this.renderer.addClass(e, 'error');
        setTimeout(() => {
          this.renderer.removeClass(e, 'error');
        }, 500);
      });
    }
    //vacía el array de divs seleccionados
    this.dragElements = [];
  }

  private getSoup(): Array<Array<string>> {
    this.words = this.getRandomWords();
    console.log(this.words);
    let puzzle = WordFind().newPuzzle(this.words, {
      height: 10,
      width: 15,
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
}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { cards } from '../game.constants';

@Component({
  selector: 'app-mayoromenor',
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.scss'],
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        })
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('default => flipped', [animate('400ms')]),
      //transition('flipped => default', [animate('200ms')]),
    ]),
  ],
})
export class MayoromenorComponent implements OnInit {
  cardState: string = 'default';
  playing: boolean = false;
  currentCard: number = 0;
  prevCard: number = 0;
  points: number = 0;
  error: string = '';
  constructor() {}

  ngOnInit(): void {}

  initGame() {
    if (this.playing) {
      this.error = '¡El juego no terminó, siga jugando!';
      return;
    } else {
      this.rebootGame();
      this.flipCard();
      this.currentCard = this.getCard();
    }
  }

  try(guess: string) {
    if (!this.playing) {
      this.error = 'El juego terminó.';
      return;
    }
    this.prevCard = this.currentCard;
    this.currentCard = this.getCard();
    this.flipCard();
    //iguales
    if (this.currentCard === this.prevCard) {
      return;
    }
    //guess mayor
    if (guess == 'mayor') {
      this.currentCard > this.prevCard ? this.points++ : (this.playing = false);
    } else {
      //guess menor
      this.currentCard < this.prevCard ? this.points++ : (this.playing = false);
    }
  }

  private getCard(): number {
    let index = Math.floor(Math.random() * cards.length);
    return cards[index];
  }

  private flipCard(): void {
    if (this.cardState === 'default') {
      this.cardState = 'flipped';
    }
    setTimeout(() => {
      this.cardState = 'default';
    }, 400);
  }

  private rebootGame() {
    this.error = '';
    this.currentCard = 0;
    this.points = 0;
    this.prevCard = 0;
    this.playing = true;
  }
}

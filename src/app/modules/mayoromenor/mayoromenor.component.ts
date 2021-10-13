import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { cards, guessScore, timeMayorMenor } from './constants';
import { TimerComponent } from '../shared/timer/timer.component';
import { ScoreComponent } from '../shared/score/score.component';

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
    ]),
  ],
})
export class MayoromenorComponent implements OnInit {
  gamename: string = 'mayoromenor';
  @ViewChild(TimerComponent) countDown: TimerComponent = new TimerComponent();
  @ViewChild(ScoreComponent) score!: ScoreComponent;
  cardState: string = 'default';
  playing: boolean = false;
  currentCard: number = 0;
  prevCard: number = 0;
  cards: Array<number> = [];
  error: string = '';
  even: string = '';
  counter: number = 0;
  win: boolean = false;
  loos: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  initGame() {
    this.rebootGame();
    this.flipCard();
    this.currentCard = this.getCard();
  }

  try(guess: string) {
    this.prevCard = this.currentCard;
    this.currentCard = this.getCard();
    this.flipCard();
    this.countDown.reboot();
    this.guess(guess);
    this.check();
  }

  cancel() {
    this.score.saveTotalAndGameScore();
    setTimeout(() => {
      this.playing = false;
    }, 200);
  }

  timeOut() {
    this.countDown.stop();
    this.error = 'Se terminó el tiempo';
    this.loos = true;
  }

  get currentCardImage(): string {
    return `assets/cards/${this.currentCard}.png`;
  }

  get prevCardImage(): string {
    return `assets/cards/${this.prevCard}.png`;
  }

  private guess(guess: string) {
    //iguales
    if (this.currentCard === this.prevCard) {
      this.even = '¡Iguales!';
      setTimeout(() => {
        this.even = '';
      }, 2000);
      return;
    }
    //guess mayor
    if (guess == 'mayor')
      this.currentCard > this.prevCard
        ? this.addGuessScore()
        : (this.loos = true);
    //guess menor
    else
      this.currentCard < this.prevCard
        ? this.addGuessScore()
        : (this.loos = true);
  }

  private check() {
    if (this.cards.length === 0) this.win = true;
    if (this.loos)
      setTimeout(() => {
        this.score.saveTotalAndGameScore();
      }, 2000);
  }

  private getCard(): number {
    let index = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(index, 1)[0];
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
    this.prevCard = 0;
    this.playing = true;
    this.counter = timeMayorMenor;
    this.cards = cards;
    this.win = false;
    this.loos = false;
    //start counter
    setTimeout(() => {
      this.countDown.start();
    }, 500);
  }

  private addGuessScore() {
    this.score.updateCurrentGameScore(guessScore);
  }
}

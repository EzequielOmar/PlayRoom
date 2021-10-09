import { Injectable } from '@angular/core';
import { missesAllowed, words } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AhorcadoService {
  letters: Array<any> = [];
  secretWord: Array<any> = [];
  misses: number = 0;
  win: Boolean = false;
  lost: Boolean = false;
  constructor() {
    this.letters = this.makeLetters('abcdefghijklmnopqrstuvwxyz');
    this.reset();
  }

  reset() {
    this.cleanLetters(this.letters);
    this.secretWord = this.makeLetters(this.getRandomWord());
    this.misses = 0;
    this.win = false;
    this.lost = false;
  }

  try(guess: string): Boolean {
    let found = false;
    this.secretWord.forEach((letter: any) => {
      if (guess.toUpperCase() === letter.name.toUpperCase()) {
        letter.chosen = true;
        found = true;
      }
    });
    if (!found) {
      this.misses++;
    }
    this.checkForEndOfGame();
    return found;
  }

  missesLeft() {
    return missesAllowed - this.misses;
  }

  private getRandomWord(): string {
    let index = Math.floor(Math.random() * words.length);
    if (words[index].length > 3) {
      return words[index];
    } else {
      return this.getRandomWord();
    }
  }

  private makeLetters(word: string): Array<any> {
    let ret: Array<any> = [];
    ret = word.split('').map((character: string) => {
      return { name: character, chosen: false };
    });
    return ret;
  }

  private revealSecret() {
    this.secretWord.forEach((letter: any) => {
      letter.chosen = true;
    });
  }

  private cleanLetters(secretWord: Array<any>) {
    secretWord.forEach((letter: any) => {
      letter.chosen = false;
    });
  }

  private checkForEndOfGame() {
    this.win = this.secretWord.reduce((acc: any, letter: any) => {
      return acc && letter.chosen;
    }, true);
    if (!this.win && this.misses === missesAllowed) {
      this.lost = true;
      this.revealSecret();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { AhorcadoService } from './ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
  animations: [
    trigger('armR', [
      state(
        'true',
        style({
          'stroke-dasharray': 46,
        })
      ),
      state(
        'false',
        style({
          'stroke-dasharray': 22,
          display: 'none',
        })
      ),
      transition('true => false', [animate('1s')]),
    ]),
    trigger('armL', [
      state(
        'true',
        style({
          'stroke-dasharray': 46,
        })
      ),
      state(
        'false',
        style({
          'stroke-dasharray': 22,
          display: 'none',
        })
      ),
      transition('true => false', [animate('1s')]),
    ]),
    trigger('legR', [
      state(
        'true',
        style({
          'stroke-dasharray': 43,
        })
      ),
      state(
        'false',
        style({
          'stroke-dasharray': 22,
          display: 'none',
        })
      ),
      transition('true => false', [animate('1s')]),
    ]),
    trigger('legL', [
      state(
        'true',
        style({
          'stroke-dasharray': 46,
        })
      ),
      state(
        'false',
        style({
          'stroke-dasharray': 22,
          display: 'none',
        })
      ),
      transition('true => false', [animate('1s')]),
    ]),
    trigger('armR', [
      state(
        'true',
        style({
          'stroke-dasharray': 46,
        })
      ),
      state(
        'false',
        style({
          'stroke-dasharray': 22,
          display: 'none',
        })
      ),
      transition('true => false', [animate('1s')]),
    ]),
  ],
})
export class AhorcadoComponent implements OnInit {
  armR: Boolean = true;
  armL: Boolean = true;
  legR: Boolean = true;
  legL: Boolean = true;
  animation: Boolean = false;
  secretWord: Array<any> = [];
  letters: Array<any> = [];
  missesLeft: number = 0;
  error: string = '';
  win: Boolean = false;
  constructor(private hmc: AhorcadoService) {
    this.reset();
  }

  ngOnInit(): void {}

  reset() {
    if (this.missesLeft > 0 && !this.win) {
      this.error = '*El juego no ha terminado*';
      return;
    }
    this.hmc.reset();
    this.error = '';
    this.secretWord = this.hmc.secretWord;
    this.letters = this.hmc.letters;
    this.missesLeft = this.hmc.missesLeft();
    this.armR = true;
    this.armL = true;
    this.legR = true;
    this.legL = true;
    this.animation = false;
  }

  try(char: any) {
    if (this.hmc.lost) {
      this.error = '¡Perdiste!';
      return;
    }
    if (char.chosen) {
      this.error = '¡Ya seleccionó esa letra!';
      return;
    }
    char.chosen = true;
    this.hmc.try(char.name);
    if (this.missesLeft > this.hmc.missesLeft()) {
      this.missesLeft = this.hmc.missesLeft();
      this.handleAnimation();
    }
    this.error = '';
    this.win = this.hmc.win;
  }

  private handleAnimation() {
    switch (this.missesLeft) {
      case 4:
        this.legR = false;
        break;
      case 3:
        this.legL = false;
        break;
      case 2:
        this.armR = false;
        break;
      case 1:
        this.armL = false;
        break;
    }
    this.animation = true;
    setTimeout(() => {
      this.animation = false;
    }, 1000);
  }
}

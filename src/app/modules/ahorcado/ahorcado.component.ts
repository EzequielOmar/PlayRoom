import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { AhorcadoService } from './ahorcado.service';
import { TimerComponent } from '../shared/timer/timer.component';
import { multiplyWordLengthBy, timeAhorcado } from './constants';
import { ScoreComponent } from '../shared/score/score.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScoreService } from 'src/app/services/score/score.service';
import { DbService } from 'src/app/services/db/db.service';

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
export class AhorcadoComponent implements OnInit, OnDestroy {
  gamename: string = 'ahorcado';
  @ViewChild(TimerComponent) countDown: TimerComponent = new TimerComponent();
  @ViewChild(ScoreComponent) score!: ScoreComponent;
  armR: Boolean = true;
  armL: Boolean = true;
  legR: Boolean = true;
  legL: Boolean = true;
  animation: Boolean = false;
  secretWord: Array<any> = [];
  letters: Array<any> = [];
  missesLeft: number = 0;
  error: string = '';
  lost: Boolean = false;
  win: Boolean = false;
  playing: Boolean = false;
  counter: number = timeAhorcado;

  constructor(private hmc: AhorcadoService) {}

  ngOnInit(): void {}

  play() {
    this.hmc.reset();
    this.secretWord = this.hmc.secretWord;
    this.letters = this.hmc.letters;
    this.missesLeft = this.hmc.missesLeft();
    this.playing = true;
    this.win = false;
    this.lost = false;
    this.error = '';
    this.armR = true;
    this.armL = true;
    this.legR = true;
    this.legL = true;
    this.counter = timeAhorcado;
    this.playing = true;
    //start counter
    setTimeout(() => {
      this.countDown.start();
    }, 500);
  }

  cancel() {
    this.playing = false;
  }

  gameOver() {
    this.error = 'Se acabó el tiempo.';
    this.missesLeft = 0;
    this.lost = true;
    this.countDown.stop();
    this.handleAnimation();
  }

  /**
   * Recibe el char seleccionado y chequea si es válido
   * Si es un acierto suma 5 segundos al contador
   * Si es un error, descuenta una chance y activa animación
   * refresca el Dom
   * chequea si gana o pierde
   * @param char char seleccionao
   */
  try(char: any) {
    if (this.lost) {
      this.error = '¡Perdiste!';
      return;
    }
    if (char.chosen) {
      this.error = '¡Ya seleccionó esa letra!';
      return;
    }
    char.chosen = true;
    if (this.hmc.try(char.name) && !this.hmc.win) {
      this.countDown.addSeconds(5);
    }
    this.lost = this.hmc.lost;
    if (this.missesLeft > this.hmc.missesLeft()) {
      this.missesLeft = this.hmc.missesLeft();
      this.handleAnimation();
    }
    this.error = '';
    this.win = this.hmc.win;
    if (this.win) this.handleWin();
    if (this.lost) this.gameOver();
  }

  private handleWin() {
    this.countDown.stop();
    this.score.updateCurrentGameScore(
      this.secretWord.length * multiplyWordLengthBy
    );
    setTimeout(() => {
      this.score.saveTotalAndGameScore();
    }, 2000);
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

  ngOnDestroy() {
    this.countDown.ngOnDestroy();
  }
}

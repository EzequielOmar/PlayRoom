import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from './ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit {
  secretWord: Array<any> = [];
  letters: Array<any> = [];
  missesLeft: number = 0;
  error: string;
  constructor(private hmc: AhorcadoService) {
    this.error = '';
    this.reset();
  }

  ngOnInit(): void {}

  reset() {
    this.hmc.reset();
    this.secretWord = this.hmc.secretWord;
    this.letters = this.hmc.letters;
    this.missesLeft = this.hmc.missesLeft();
  }

  try(char: any) {
    if (this.hmc.lost) {
      this.error = 'Vuelve a intentarlo.';
      return;
    }
    if (char.chosen) {
      this.error = '¡Ya seleccionó esa letra!';
      return;
    }
    char.chosen = true;
    this.hmc.try(char.name);
    this.missesLeft = this.hmc.missesLeft();
    this.error = '';
  }
}

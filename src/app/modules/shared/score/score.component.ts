import { AfterViewInit, Component } from '@angular/core';
import { Score, Scores } from 'src/app/interfaces/score.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements AfterViewInit {
  counterGameScore: number = 0;
  currentUserScore!: Score;
  //uid: string | null;
  constructor(private auth: AuthService, private score: ScoreService) {}

  ngAfterViewInit() {
    //necesario el settimeout porque auth tarda en ser seteado
    setTimeout(() => {
      this.getScore();
    }, 1000);
    setTimeout(() => {
      this.updateCurrentGameScore(15);
    }, 5000);
    setTimeout(() => {
      this.updateCurrentGameScore(-5);
    }, 10000);
    setTimeout(() => {
      this.lostCurrentGameScore();
    }, 15000);
  }

  updateCurrentGameScore(score: number) {
    this.counterGameScore += score;
  }

  lostCurrentGameScore() {
    this.counterGameScore = 0;
  }

  /**
   * Guarda el valor acumulado en el juego actual,
   * sobreescribiendo el score anterior en el documento correspondiente
   * Vuelve el acumulado del juego a 0
   * @param game string con nombre del juego al que guardar score
   * ahorcado | mayoromenor | preguntados | sopadeletras
   */
  saveTotalAndGameScore(game: string) {
    switch (game) {
      case 'ahorcado':
        this.currentUserScore.scores.ahorcado += this.counterGameScore;
        break;
      case 'mayoomenor':
        this.currentUserScore.scores.mayoromenor += this.counterGameScore;
        break;
      case 'preguntados':
        this.currentUserScore.scores.preguntados += this.counterGameScore;
        break;
      case 'sopadeletras':
        this.currentUserScore.scores.sopadeletras += this.counterGameScore;
        break;
    }
    this.currentUserScore.scores.total =
      this.currentUserScore.scores.ahorcado +
      this.currentUserScore.scores.mayoromenor +
      this.currentUserScore.scores.preguntados +
      this.currentUserScore.scores.sopadeletras;
    this.counterGameScore = 0;
    this.score.setNewScore(
      this.currentUserScore.uid,
      this.currentUserScore.scores
    );
  }

  private getScore() {
    if (this.auth.currentUser?.uid) {
      this.score
        .getScore(this.auth.currentUser?.uid)
        .then((doc: any) => {
          this.currentUserScore = { uid: doc.id, scores: doc.data() };
        })
        .catch(() => {
          let scores: Scores = {
            ahorcado: 0,
            mayoromenor: 0,
            preguntados: 0,
            sopadeletras: 0,
            total: 0,
          };
          this.score.setNewScore(this.auth.currentUser?.uid ?? '', scores);
          this.currentUserScore = {
            uid: this.auth.currentUser?.uid ?? '',
            scores: scores,
          };
        });
    }
  }
}

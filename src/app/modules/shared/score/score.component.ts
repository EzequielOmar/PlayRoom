import { Component } from '@angular/core';
import { dbName_Score, Scores } from 'src/app/interfaces/score.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  counterUserScore: string = '';
  counterGameScore: string = '';
  uid: string;
  constructor(private auth: AuthService, private db: DbService) {
    console.log(this.auth.currentUser?.uid);
    this.uid = this.auth.currentUser?.uid ?? '';
    console.log(this.uid);
    this.getUserScore();
  }

  private getUserScore() {
    this.db.getDocOnce(dbName_Score, this.uid).then((doc: any) => {
      if (doc.exists) {
        console.log(doc);
      } else {
        this.CreateNewScoreDoc();
      }
    });
  }

  private CreateNewScoreDoc() {
    let scores: Scores = {
      ahorcado: 0,
      mayoromenor: 0,
      preguntados: 0,
      sopadeletras: 0,
    };
    this.db.setWithId(dbName_Score, this.uid, scores);
  }
}

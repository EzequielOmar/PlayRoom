import { Component, OnInit } from '@angular/core';
import { Score, Scores } from 'src/app/interfaces/score.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  ranking!: Score[];
  userScore!: Score;
  rank!: number;

  constructor(private ss: ScoreService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getRanking();
  }

  private getRanking() {
    this.ss.getRanking().onSnapshot((snap: any) => {
      this.ranking = [];
      let i = 1;
      snap.forEach((doc: any) => {
        if (doc.id === this.auth.currentUser?.uid) {
          this.userScore = { uid: doc.id, scores: doc.data() } as Score;
          this.rank = i;
        }
        this.ranking?.push({ uid: doc.id, scores: doc.data() } as Score);
        i++;
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Scores } from 'src/app/interfaces/score.interface';
import { DbService } from '../db/db.service';
import { databases } from '../dbNames';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private db: DbService) {}

  setNewScore(uid: string, scores: Scores) {
    this.db.setWithId(databases.score, uid, scores);
  }

  getScore = async (uid: string) =>
    await this.db.getDocOnce(databases.score, uid);

  getRanking() {
    return this.db.getObserverDb(databases.score).orderBy('total','desc');
  }
}

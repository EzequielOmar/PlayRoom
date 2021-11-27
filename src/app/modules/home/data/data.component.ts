import { Component, OnInit } from '@angular/core';
import { Survey, SurveyId } from 'src/app/interfaces/survey.interface';
import { DbService } from 'src/app/services/db/db.service';
import { databases } from 'src/app/services/dbNames';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  surveys?: SurveyId[];
  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.getSurveys();
  }

  private getSurveys() {
    this.surveys = [];
    this.db.getDbOnce(databases.survey).then((snap: any) => {
      snap.forEach((doc: any) => {
        this.surveys?.push({ uid: doc.id, data: doc.data() } as SurveyId);
      });
    });
  }
}

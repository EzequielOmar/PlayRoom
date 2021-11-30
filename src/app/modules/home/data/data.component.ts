import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  MultiDataSet,
  SingleDataSet,
} from 'ng2-charts';
import { SurveyId } from 'src/app/interfaces/survey.interface';
import { DbService } from 'src/app/services/db/db.service';
import { databases } from 'src/app/services/dbNames';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  surveys?: SurveyId[];
  fav: any = { ahorcado: 0, mayoromenor: 0, preguntados: 0, sopadeletras: 0 };
  //chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['', '', '', ''];
  public pieChartData: SingleDataSet = [0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private db: DbService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getSurveys().then(() => {
      this.setCharFavGame();
    });
  }

  private getSurveys = async () => {
    this.surveys = [];
    await this.db.getDbOnce(databases.survey).then((snap: any) => {
      snap.forEach((doc: any) => {
        let s = { uid: doc.id, data: doc.data() } as SurveyId;
        this.surveys?.push({ uid: doc.id, data: doc.data() } as SurveyId);
      });
    });
  };

  private setCharFavGame() {
    this.surveys?.forEach((s) => {
      switch (s.data.fav_game) {
        case 'ahorcado':
          this.fav.ahorcado = this.fav.ahorcado + 1;
          break;
        case 'mayoromenor':
          this.fav.mayoromenor = this.fav.mayoromenor + 1;
          break;
        case 'preguntados':
          this.fav.preguntados = this.fav.preguntados + 1;
          break;
        case 'sopadeletras':
          this.fav.sopadeletras = this.fav.ahorcado + 1;
          break;
      }
    });
    this.pieChartLabels = Object.keys(this.fav);
    this.pieChartData = [Object.values(this.fav)];
  }
}

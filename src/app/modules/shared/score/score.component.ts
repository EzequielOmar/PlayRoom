import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  counterUserScore: string = '150';
  counterGameScore: string = '25';
  constructor(private auth: AuthService) {
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { TimerComponent } from './timer/timer.component';
import { ScoreTrackerComponent } from './score/score.tracker';

@NgModule({
  declarations: [ScoreComponent, TimerComponent, ScoreTrackerComponent],
  imports: [CommonModule],
  exports: [ScoreComponent, TimerComponent],
})
export class SharedModule {}

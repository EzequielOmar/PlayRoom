import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [ScoreComponent, TimerComponent],
  imports: [CommonModule],
  exports: [ScoreComponent, TimerComponent],
})
export class SharedModule {}

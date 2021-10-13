import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() counter!: number;
  @Output() gameOver: EventEmitter<Boolean> = new EventEmitter();
  count: number = 0;
  countDown?: Subscription;
  addSec: number = 0;

  constructor() {}

  ngOnInit() {}

  start() {
    //start count down
    this.count = this.counter;
    this.unpause();
  }

  stop() {
    this.countDown?.unsubscribe();
  }

  reboot() {
    this.stop();
    this.start();
  }

  unpause() {
    this.countDown = timer(1000, 1000).subscribe(() => {
      --this.count;
      if (this.count == 0) {
        this.gameOver.emit(true);
      }
    });
  }

  addSeconds(seconds: number) {
    this.count += seconds;
    this.addSecondsAnimation(seconds);
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
  }

  private addSecondsAnimation(seconds: number) {
    this.addSec = seconds;
    setTimeout(() => {
      this.addSec = 0;
    }, 1000);
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() counter!: number;
  count: number = 0;
  @Output() gameOver: EventEmitter<Boolean> = new EventEmitter();
  countDown?: Subscription;

  constructor() {}

  ngOnInit() {}

  start() {
    //start count down
    this.count = this.counter;
    this.countDown = timer(1000, 1000).subscribe(() => {
      --this.count;
      if (this.count == 0) {
        this.gameOver.emit(true);
      }
    });
  }

  stop() {
    this.countDown?.unsubscribe();
  }

  addSeconds(seconds: number) {
    this.counter += seconds;
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
  }
}

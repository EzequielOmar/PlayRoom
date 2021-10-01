import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() counter!: number;
  @Output() gameOver: EventEmitter<Boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    if (change.counter.currentValue === 0) {
      this.gameOver.emit(true);
    }
  }
}

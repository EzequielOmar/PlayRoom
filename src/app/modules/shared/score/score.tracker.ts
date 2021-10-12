import { Component, Input } from '@angular/core';
import { Subject, timer } from 'rxjs';
import {
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  mapTo,
} from 'rxjs/operators';

@Component({
  selector: 'number-tracker',
  template: `
    <span style="color:{{ color }}"
      ><strong>{{ currentNumber }}</strong></span
    >
  `,
  styleUrls: ['./score.component.scss'],
})
export class ScoreTrackerComponent {
  @Input() color = '';
  @Input() set end(endRange: string) {
    this._counterSub$.next(parseInt(endRange));
  }
  countInterval = 50;
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();
  constructor() {
    this._counterSub$
      .pipe(
        switchMap((endRange: any) => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          );
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => (this.currentNumber = val));
  }
  private positiveOrNegative(endRange: number, currentNumber: number) {
    return endRange > currentNumber ? 1 : -1;
  }
  private isApproachingRange(endRange: number, currentNumber: number) {
    return endRange > currentNumber
      ? (val: number) => val <= endRange
      : (val: number) => val >= endRange;
  }
  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}

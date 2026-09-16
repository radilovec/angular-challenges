import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({ selector: '[appHoldable]' })
export class AppHoldable {
  duration = input.required<number>();

  progressUpdated = output<number>();
  complete = output<void>();

  private elementRef = inject(ElementRef);

  constructor() {
    const reset$ = merge(
      fromEvent(this.elementRef.nativeElement, 'mouseleave'),
      fromEvent(this.elementRef.nativeElement, 'mouseup'),
    ).pipe(tap(() => this.progressUpdated.emit(0)));

    fromEvent(this.elementRef.nativeElement, 'mousedown')
      .pipe(
        switchMap(() => {
          return interval(10).pipe(
            takeUntil(reset$),

            map((tick) =>
              Math.min((((tick + 1) * 10) / this.duration()) * 100, 100),
            ),

            tap((v) => this.progressUpdated.emit(v)),
            filter((v) => v >= 100),

            take(1),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.complete.emit();
      });
  }
}

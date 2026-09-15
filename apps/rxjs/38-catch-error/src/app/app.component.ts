import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, concatMap, map, of } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  template: `
    <div class="form-container">
      <span>
        possible values: posts, comments, albums, photos, todos, users
      </span>
    </div>
    <form class="form-container" (ngSubmit)="submit$.next()">
      <input
        type="text"
        placeholder="Enter text"
        [(ngModel)]="input"
        name="action" />
      <button>Fetch</button>
    </form>
    <div class="response">
      {{ response() | json }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  submit$ = new Subject<void>();
  input = '';
  response = signal<unknown>(undefined);

  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  ngOnInit() {
    this.submit$
      .pipe(
        map(() => this.input),
        concatMap((value) =>
          this.http.get(`https://jsonplaceholder.typicode.com/${value}/1`).pipe(
            catchError((err) => {
              return of(err);
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.response.set(value);
        },
        error: (error) => {
          console.log(error);
          this.response.set(error);
        },
        complete: () => console.log('done'),
      });
  }
}

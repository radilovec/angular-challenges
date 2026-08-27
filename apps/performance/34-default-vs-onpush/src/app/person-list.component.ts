import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { randFirstName } from '@ngneat/falso';
import { AppInputComponent } from './app-input.component';
import { AppListComponent } from './app-list.component';

@Component({
  selector: 'app-person-list',
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    TitleCasePipe,
    AppInputComponent,
    AppListComponent,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ gender() | titlecase }}
    </h1>

    <app-input (add)="onAdd($event)" />

    <app-list [list]="list()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  gender = input.required<gender>();

  list = linkedSignal(() => {
    const gender = this.gender();
    return resolveList(gender);
  });

  onAdd(item: string): void {
    this.list.update((prev) => [item, ...prev]);
  }
}

type gender = 'male' | 'female';

const resolveList = (gender: gender, length = 10) => {
  return randFirstName({ gender, length });
};

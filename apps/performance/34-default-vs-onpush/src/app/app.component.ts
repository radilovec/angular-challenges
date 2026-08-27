import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';

@Component({
  imports: [PersonListComponent, RandomComponent],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-random />

    <div class="flex">
      <app-person-list gender="female" />
      <app-person-list gender="male" />
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  girlList = randFirstName({ gender: 'female', length: 10 });
  boyList = randFirstName({ gender: 'male', length: 10 });
}

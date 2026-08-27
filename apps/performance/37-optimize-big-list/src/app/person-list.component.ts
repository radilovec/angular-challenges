import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <div class="absolute inset-0 overflow-scroll">
        <cdk-virtual-scroll-viewport class="h-full" itemSize="36">
          <div
            *cdkVirtualFor="let person of persons(); trackBy: trackByFn"
            class="flex h-9 items-center justify-between border-b">
            <h3>{{ person.name }}</h3>
            <p>{{ person.email }}</p>
          </div>
        </cdk-virtual-scroll-viewport>
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
  ],
})
export class PersonListComponent {
  persons = input<Person[]>();

  trackByFn = (index: number, person: Person) => person.email;
}

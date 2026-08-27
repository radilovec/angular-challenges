import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';

@Component({
  imports: [MatDivider, MatList, MatListItem, CDFlashingDirective],
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list class="flex w-full">
      @if (list()?.length === 0) {
        <div class="empty-list-label">Empty list</div>
      }

      @for (item of list(); track item) {
        <mat-list-item cd-flash class="text-orange-500">
          <div class="flex justify-between">
            <h3 title="Name">
              {{ item }}
            </h3>
          </div>
        </mat-list-item>
      }

      @if (list()?.length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  standalone: true,
})
export class AppListComponent {
  list = input<string[]>([]);
}

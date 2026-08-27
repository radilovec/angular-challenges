import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [
    CDFlashingDirective,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppInputComponent {
  label = model<string>('');

  add = output<string>();

  handleKey(event: KeyboardEvent): void {
    const trimmed = this.label().trim();

    if (event.key === 'Enter' && trimmed) {
      this.add.emit(trimmed);
      this.label.set('');
    }
  }
}

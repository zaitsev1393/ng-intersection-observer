import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgObserverDirective } from './ng-observer/ng-observer.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgObserverDirective],
  template: `
    <div class="container">
      <div
        ng-observer
        (enteredViewport)="enteredViewport($event)"
        class="element"
      ></div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  enteredViewport(value: boolean): void {
    console.log('entered viewport: ', value);
  }
}

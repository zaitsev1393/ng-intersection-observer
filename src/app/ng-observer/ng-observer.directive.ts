import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[ng-observer]',
  standalone: true,
})
export class NgObserverDirective {
  @Output() onEnterViewport: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    let initialized = false;

    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (!initialized) {
        initialized = true;
        return;
      }
      entries.forEach((entry: IntersectionObserverEntry) =>
        this.onEnterViewport.emit(entry.isIntersecting)
      );
    };

    const target = inject(ElementRef).nativeElement;
    const observer = new IntersectionObserver(callback);

    observer.observe(target);
  }
}

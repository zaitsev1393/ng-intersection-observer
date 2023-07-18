import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[ng-observer]',
  standalone: true,
})
export class NgObserverDirective {
  @Output() enteredViewport: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    let initialized = false;

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (!initialized) {
        initialized = true;
        return;
      }
      entries.forEach((entry: IntersectionObserverEntry) =>
        this.enteredViewport.emit(entry.isIntersecting)
      );
    };

    const target = inject(ElementRef).nativeElement;
    const observer = new IntersectionObserver(callback);

    observer.observe(target);
  }
}

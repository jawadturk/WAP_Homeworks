import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyvisibility]'
})
export class MyvisibilityDirective {
  @Input('appMyvisibility') appMyVisibility: boolean;
  constructor(private e: ElementRef, private r: Renderer2) {


  }


  ngOnInit() {

    let displayValue = "block";
    if (!this.appMyVisibility) {
      displayValue = "none";
    }
    this.r.setStyle(this.e.nativeElement, 'display', displayValue);

  }


}

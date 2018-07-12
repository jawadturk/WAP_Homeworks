import { Directive, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';


@Directive({
  selector: '[appMynewcolor]'
})
export class MynewcolorDirective {
  @Output() colorEmitter: EventEmitter<string>;
  colors: string[];


  constructor(private e: ElementRef, private r: Renderer2) {
    this.colorEmitter = new EventEmitter();
    this.colors = ["red", "green", "yellow", "blue", "black", "brown", "DarkCyan", "DarkOrange"];
  }

  getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  @HostListener('click') changeColor() {
    let colorVal = this.getColor();
    this.e.nativeElement.style.color = colorVal;
    this.colorEmitter.emit(colorVal);
  }

  ngOnInit() {
    this.colorEmitter.emit('Default!!');
  }

}

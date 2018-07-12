import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-array-comp',
  template: `
    
  <ul>
  <li appUpperDirective *ngFor="let str of strArrayInput" appMynewcolor (colorEmitter)="updateColor($event)">
    {{ str }}
  </li>
</ul>
<div [appMyvisibility]="true" appMynewcolor (colorEmitter)="updateColor($event)" >Heyyyyyyy!</div> 
<div>Color Selected is: {{colorValue}}</div>

  `,
  styles: []
})
export class ArrayCompComponent implements OnInit {

  @Input("StringArrayInput") strArrayInput;
  colorValue: string = "Black";

  constructor() { }

  ngOnInit() {
  }


  updateColor(color) {
    this.colorValue = color;
  }


}

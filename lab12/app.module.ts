import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArrayCompComponent } from './array-comp.component';
import { MyvisibilityDirective } from './myvisibility.directive';
import { MynewcolorDirective } from './mynewcolor.directive';


@NgModule({
  declarations: [
    AppComponent,
    ArrayCompComponent,
    MyvisibilityDirective,
    MynewcolorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

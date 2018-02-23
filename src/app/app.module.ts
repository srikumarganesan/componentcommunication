import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import {FormsModule} from '@angular/forms';
import { ParentComponent } from './parent/parent.component';
import { AnotherComponentComponent } from './another-component/another-component.component';
import {AppService} from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
    AnotherComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

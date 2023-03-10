import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WorksListMainComponent } from './works-list-main/works-list-main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkFormComponent } from './works-list-main/work-form/work-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorksListMainComponent,
    WorkFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

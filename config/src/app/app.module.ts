import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';

import { LayoutModule } from './module/layout/layout.module';

import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ConfigComponent, FormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

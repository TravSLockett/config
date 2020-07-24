import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { SharedVService } from './services/shared-v.service';
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
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    LayoutModule,
  ],
  providers: [ApiServiceService, SharedVService],
  bootstrap: [AppComponent],
})
export class AppModule {}

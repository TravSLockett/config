import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LayoutComponent } from '../../components/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'config',
    component: ConfigComponent,
    data: { animation: 'ConfigPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../app/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation,
    // animation triggers go here
  ],
})
export class AppComponent implements OnInit {
  constructor(private responsiveService: ResponsiveService) {}
  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        console.log('Mobile device detected');
      } else {
        console.log('Desktop detected');
      }
    });
    this.onResize();
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMobile: Boolean;
  git = false;
  constructor(
    private router: Router,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
  }
  onResize() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  goToPage(str) {
    console.log('at home, going to config page');
    this.router.navigate(['config'], {
      state: { data: { buttonpressed: str } },
    });
  }
}

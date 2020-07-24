import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';

import { SharedVService } from '../../services/shared-v.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMobile: Boolean;
  git = false;
  dataFromConfig: any;
  jenkinsDone = false;
  jenkinsCheck = '../../../assets/jenkinsCheckmark.png';
  githubDone = false;
  githubCheck = '../../../assets/githubCheckmark.png';
  dockerDone = false;
  dockerCheck = '../../../assets/dockerCheckmark.png';
  returnedList;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService, //private kubernetes: Boolean

    private shared: SharedVService
  ) {}

  ngOnInit() {
    //this.onResize();
    //this.responsiveService.checkWidth();

    this.dataFromConfig = history.state.data.buttonFinished;
    console.log('dataFromConfig is currently ' + this.dataFromConfig);
    if (this.dataFromConfig === 'Jenkins') {
      this.shared.setJenkins(true);
    } else if (this.dataFromConfig === 'Github') {
      this.shared.setGithub(true);
    } else if (this.dataFromConfig === 'Docker') {
      this.shared.setDocker(true);
    }
    this.jenkinsDone = this.shared.getJenkins();
    this.githubDone = this.shared.getGithub();
    this.dockerDone = this.shared.getDocker();
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

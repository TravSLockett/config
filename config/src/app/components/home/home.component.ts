import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';
import { ApiServiceService } from '../../services/api-service.service';

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
    private _apiService: ApiServiceService
  ) {}

  async ngOnInit() {
    //this.onResize();
    //this.responsiveService.checkWidth();
    this.dataFromConfig = history.state.data.buttonFinished;
    console.log('dataFromConfig is currently ' + this.dataFromConfig);
    let list = await this._apiService.getEnabledList();

    this.returnedList = list;
    console.log(list);
    this.returnedList.forEach(function (item) {
      if (item == 'Jenkins') {
        console.log(item);
        this.jenkinsDone = true;
      } else if (item == 'Github') {
        console.log(item);
        this.githubDone = true;
      } else if (item == 'Docker') {
        console.log(item);
        this.dockerDone = true;
      }
    });
    /*
    if (this.dataFromConfig === 'Jenkins') {
      this._apiService.addToEnabled(this.dataFromConfig)
      this.jenkinsDone = true;
    } else if (this.dataFromConfig === 'Github') {
      this.githubDone = true;
    } else if (this.dataFromConfig === 'Docker') {
      this.dockerDone = true;
    }
    */
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

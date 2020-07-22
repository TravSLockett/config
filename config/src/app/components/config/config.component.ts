import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  constructor(private router: Router) {}
  data: any;
  message: string;

  ngOnInit(): void {
    this.data = history.state.data.buttonpressed;
    this.message = 'Configure New ' + this.data + ' Masters';
  }

  goToPage() {
    console.log('at home, going to config page');
    this.router.navigate(['home']);
  }
  whichPic() {
    if (this.data === 'Github') {
      return '../../../assets/githubBig.png';
    } else if (this.data === 'Splunk') {
      return '../../../assets/splunkBig.png';
    } else if (this.data === 'Jenkins') {
      return '../../../assets/jenkinsBig.png';
    } else if (this.data === 'Kubernetes') {
      return '../../../assets/kubernetesBig.png';
    } else if (this.data === 'Dinghy') {
      return '../../../assets/dinghy-1.png';
    } else if (this.data === 'Docker') {
      return '../../../assets/docker.png';
    }
  }
}

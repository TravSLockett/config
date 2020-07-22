import { Component, OnInit, Input } from '@angular/core';
import { form } from '../../models/form';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() which: string;
  constructor(private _apiService: ApiServiceService) {}

  ngOnInit(): void {
    if (this.which === 'Jenkins') {
      this.Jenkins = true;
    } else if (this.which === 'Github') {
      this.Github = true;
    } else if (this.which === 'Docker') {
      this.Docker = true;
    } else if (this.which === 'Kubernetes') {
      this.Kubernetes = true;
    } else if (this.which === 'Dinghy') {
      this.Dinghy = true;
    }
  }

  model = new form(null, '', '');
  Jenkins = false;
  Github = false;
  Docker = false;
  Kubernetes = false;
  Dinghy = false;

  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
  services = ['Github', 'Splunk', 'Jenkins', 'Kubernetes'];
  enable() {
    this.model = new form('10', '', '');
  }
  enableIt() {
    this._apiService.enable(
      this.which,
      this.model.name,
      this.model.hostname,
      this.model.username,
      this.model.password,
      this.model.repo,
      this.model.content,
      this.model.org
    );
  }
}

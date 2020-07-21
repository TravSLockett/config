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

  ngOnInit(): void {}

  model = new form(null, '', '');
  Jenkins = false;
  Github = false;
  Docker = false;
  Kubernetes = false;
  Dinghy = true;

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
      this.model.hostname,
      this.model.username,
      this.model.password
    );
  }
}

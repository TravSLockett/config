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

  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
  services = ['Github', 'Splunk', 'Jenkins', 'Kubernetes'];
  enable() {
    this.model = new form(10, '', '');
  }
  enableIt() {
    this._apiService.enable(
      this.which,
      this.model.id,
      this.model.name,
      this.model.configuration
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { form } from '../../models/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor() {}

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
}

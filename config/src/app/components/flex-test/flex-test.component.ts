import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-test',
  templateUrl: './flex-test.component.html',
  styleUrls: ['./flex-test.component.css'],
})
export class FlexTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  name = 'hello';
}

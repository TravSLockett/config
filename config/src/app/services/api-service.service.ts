import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  enable(which, address, username, password) {
    var data = {
      which: which,
      address: address,
      username: username,
      password: password,
    };

    return this.http
      .post(
        'http://localhost:3000/users/enable',
        JSON.stringify(data),
        httpOptions
      )
      .toPromise();
  }
}

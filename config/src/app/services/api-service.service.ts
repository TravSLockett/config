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

  enable(which, name?, hostname?, username?, password?, repo?, content?, org?) {
    var data = {
      which: which,
      name: name,
      hostname: hostname,
      username: username,
      password: password,
      repo: repo,
      content: content,
      org: org,
    };

    return this.http
      .post(
        'http://localhost:3000/users/enable',
        JSON.stringify(data),
        httpOptions
      )
      .toPromise();
  }

  addToEnabled(which) {
    var data = {
      which: which,
    };
    return this.http
      .post(
        'http://localhost:3000/users/add',
        JSON.stringify(data),
        httpOptions
      )
      .toPromise();
  }

  getEnabledList() {
    return this.http.get('http://localhost:3000/users/get');
  }
}

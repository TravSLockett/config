import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedVService {
  jenkinsG;

  githubG;

  dockerG;

  constructor() {
    this.dockerG = false;
    this.githubG = false;
    this.jenkinsG = false;
  }

  setJenkins(val: boolean) {
    this.jenkinsG = val;
  }

  setGithub(val: boolean) {
    this.githubG = val;
  }
  setDocker(val: boolean) {
    this.dockerG = val;
  }

  getJenkins() {
    return this.jenkinsG;
  }
  getGithub() {
    return this.githubG;
  }
  getDocker() {
    return this.dockerG;
  }
}

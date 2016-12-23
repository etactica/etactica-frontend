import { Component } from '@angular/core';

import { AppState } from '../app.service';
import {Auth} from "../auth/auth.service";

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Auth
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };

  constructor(public appState: AppState, private auth: Auth) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}

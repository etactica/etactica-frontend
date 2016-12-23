import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import {Auth} from "./auth.service";


@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  providers: [
    Auth
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  etacticaLogo = 'assets/img/etacticalogo.svg';
  name = 'Etactica 3';
  url = 'http://www.etactica.com/';

  constructor(
    public appState: AppState, private auth: Auth) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

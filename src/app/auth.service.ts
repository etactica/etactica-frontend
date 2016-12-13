import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    icon: 'http://ssh.etactica.com/assets/img/etactica_logo_icon_new.svg',
    rememberLastLogin: false,
    auth: {
      params: {
        scope: 'openid email name picture',

      }
    }
  });

  constructor() {
    var that = this;
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      console.log(JSON.stringify(authResult, null, 2));
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('claims', JSON.stringify(authResult.idTokenPayload));
      console.log('email: ' + authResult.idTokenPayload.email);
      console.log('name: ' + authResult.idTokenPayload.name);


    });
    // var hash = that.lock.parseHash(window.location.hash);
    // console.log(JSON.stringify(hash, null, 2));
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('claims');
  };
  
  public name() {
    return JSON.parse(localStorage.getItem('claims')).name;
  }

  public picture() {
    return JSON.parse(localStorage.getItem('claims')).picture;
  }
}

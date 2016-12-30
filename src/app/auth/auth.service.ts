import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config.ts';
import 'rxjs/add/operator/take';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    //icon: 'http://ssh.etactica.com/assets/img/etactica_logo_icon_new.svg',
    theme: {
      logo: 'https://ssh.etactica.com/assets/img/etactica_logo_icon_new.svg',
      primaryColor: 'rgb(37, 123, 160)'
    },
    languageDictionary: {
      title: "eTactica"
    },
    socialButtonStyle: 'small',
    autoclose: true,
    rememberLastLogin: false,
    auth: {
      redirect: false,
      params: {
        scope: 'openid email name picture'
      }
    }
  });

  auth0 = new Auth0({ clientID: myConfig.clientID, domain: myConfig.domain });

  constructor(private router: Router) {
    var that = this;
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      console.log(JSON.stringify(authResult, null, 2));
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('claims', JSON.stringify(authResult.idTokenPayload));
      console.log('email: ' + authResult.idTokenPayload.email);
      console.log('name: ' + authResult.idTokenPayload.name);
      this.router.navigate(['/home'], {});
    });

    this.lock.on('authorization_error', (err) => {
      console.log(err);
    });

    //this.handleRedirectWithHash();
  }

  private handleRedirectWithHash() {
    // attempt to fix issues with auth0-lock in redirect mode and angular2 router using hashlocationstrategy
    // from here: https://github.com/auth0/lock/issues/527#issuecomment-257171395
    let that = this;
    this.router.events.take(1).subscribe(event => {
      if (/access_token/.test(event.url) || /error/.test(event.url)) {

        let authResult = that.auth0.parseHash(window.location.hash);
        console.log('authResult:', authResult)

        if (authResult && authResult.idToken) {
          this.lock.emit('authenticated', authResult);
        }

        if (authResult && authResult.error) {
          this.lock.emit('authorization_error', authResult);
        }
      }
    });
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
    this.router.navigate(['/'], {});
  };

  public name() {
    return JSON.parse(localStorage.getItem('claims')).name;
  }

  public email() {
    return JSON.parse(localStorage.getItem('claims')).email;
  }

  public picture() {
    return JSON.parse(localStorage.getItem('claims')).picture;
  }
}

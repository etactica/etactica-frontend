import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthenticationCallbackActivateGuard implements CanActivate {
  // attempt to fix issues with auth0-lock in redirect mode and angular2 router using hashlocationstrategy
  // from here: http://stackoverflow.com/a/39701248

  constructor(private location: Location) { }

  canActivate() {
    // You may want to make a more robust check here
    console.log('can activate:', this.location.path(true).indexOf("access_token") === -1)
    return this.location.path(true).indexOf("access_token") === -1;
  }
}

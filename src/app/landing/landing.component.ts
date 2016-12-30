import { Component } from '@angular/core';

import {Auth} from "../auth/auth.service";

@Component({
  selector: 'landing',
  providers: [Auth],
  styleUrls: [ '../app.component.css' ],
  templateUrl: './landing.html'
})
export class LandingComponent {

  imgEG = 'http://www.etactica.com/wp-content/uploads/2016/08/gateway-eg-hover.png';
  imgEM = 'http://www.etactica.com/wp-content/uploads/2016/08/img-product-hover.png';

  constructor(private auth: Auth) {}

  ngOnInit() {}

}

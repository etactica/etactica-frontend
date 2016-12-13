import { Component, OnInit } from '@angular/core';
import {Angular2Apollo, ApolloQueryObservable} from 'angular2-apollo';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';

const Hello = gql`
query { hello {
    text
  } 
}`;

@Component({
  selector: 'prufa',
  templateUrl: './prufa.html',
})
export class PrufaComponent implements OnInit {
  data: ApolloQueryObservable<any>;

  constructor( private apollo: Angular2Apollo ) {}

  ngOnInit() {
    console.log('starting');
    this.apollo.watchQuery({
      query: Hello
    }).subscribe(({data}) => {
      console.log('inni');
      console.log(JSON.stringify(data));
      this.data = data.hello.text
    });
  }
}

import { Component } from '@angular/core';
import {Router,NavigationEnd} from "@angular/router";
import { FirebaseService } from './shared/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _router: Router
  ){
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.dispatchEvent(new CustomEvent('event-view-end'));
      }
    })
  }
}
import { Component } from '@angular/core';
import {Router,NavigationStart,NavigationEnd} from "@angular/router";
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
      if (event instanceof NavigationStart) {
        console.log("START LOAD : event-view-start");
        document.body.dispatchEvent(new CustomEvent('event-view-start'));
      }
    })
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("END LOAD : event-view-end");
        document.body.dispatchEvent(new CustomEvent('event-view-end'));
      }
    })
  }
}
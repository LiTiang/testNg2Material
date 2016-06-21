import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import {MATERIAL_DIRECTIVES}      from 'ng2-material';

//import 'ng2-material/ng2-material.css'; // import global css 
//import 'ng2-material/font/font.css';

// let app_style:string = String(require('!css!sass!./app.scss')); // then styles: [app_style],
// at now, the correct cond to import scss is like as `styles: [require('./xxx.scss')]`
// refrence : https://github.com/manavsehgal/AngularPages/blob/master/webpack.config.js
// temp to use String() or .toString() to fix the bug


require("ng2-material/ng2-material.css");


@Component({
  selector: 'app',
  pipes: [ ],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  directives: [
    RouterActive, 
    MATERIAL_DIRECTIVES
  ],
  
  styles: [
    require('./app.scss').toString()
  ],
  template: `
    <button md-button class="md-warn">test</button>
    <span router-active>
      <button [routerLink]=" ['Index'] ">
        Index
      </button>
    </span>

    <span router-active>
      <button [routerLink]=" ['Home'] ">
        Home
      </button>
    </span>

    <span router-active>
      <button [routerLink]=" ['About'] ">
        About
      </button>
    </span>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

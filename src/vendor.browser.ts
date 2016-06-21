// For vendors for example : 
// jQuery, Lodash, angular2-jwt ...
// just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module
// ------------------------------------------------------
// the following is imported from node_modules
// ------------------------------------------------------
//                             _          ___
//     /\                     | |        |__ \
//    /  \   _ __   __ _ _   _| | __ _ _ __ ) |
//   / /\ \ | '_ \ / _` | | | | |/ _` | '__/ /
//  / ____ \| | | | (_| | |_| | | (_| | | / /_
// /_/    \_\_| |_|\__, |\__,_|_|\__,_|_||____|
//                  __/ |
//                 |___/
import '@angular/core';
import '@angular/http';
import '@angular/common';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/compiler';
import '@angular/router';
import '@angular/router-deprecated';

// ----> moment.js
import 'moment/moment.js';

//  _____            _  _____
// |  __ \          | |/ ____|
// | |__) |__  __   | | (___
// |  _  / \ \/ /   | |\___ \
// | | \ \  >  < |__| |____) |
// |_|  \_\/_/\_\____/|_____/
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

//              ___        _                 _       _
//             |__ \      | |               | |     | |
//  _ __   __ _   ) |_____| |__   ___   ___ | |_ ___| |_ _ __ __ _ _ __
// | '_ \ / _` | / /______| '_ \ / _ \ / _ \| __/ __| __| '__/ _` | '_ \
// | | | | (_| |/ /_      | |_) | (_) | (_) | |_\__ \ |_| | | (_| | |_) |
// |_| |_|\__, |____|     |_.__/ \___/ \___/ \__|___/\__|_|  \__,_| .__/
//         __/ |                                                  | |
//        |___/                                                   |_|
// How to import more specific ? : http://stackoverflow.com/questions/36571147/angular2-ng2-material-import
import 'ng2-bootstrap/ng2-bootstrap';

//  __  __       _            _       _ ___
// |  \/  |     | |          (_)     | |__ \
// | \  / | __ _| |_ ___ _ __ _  __ _| |  ) |
// | |\/| |/ _` | __/ _ \ '__| |/ _` | | / /
// | |  | | (_| | ||  __/ |  | | (_| | |/ /_
// |_|  |_|\__,_|\__\___|_|  |_|\__,_|_|____|
// import '@angular2-material/core';
// import '@angular2-material/button';
// import '@angular2-material/checkbox';
// import '@angular2-material/icon';
// import '@angular2-material/card';
// import '@angular2-material/grid-list';
// import '@angular2-material/input';
// import '@angular2-material/list';
// import '@angular2-material/radio';
// import '@angular2-material/progress-bar';
// import '@angular2-material/progress-circle';
// import '@angular2-material/sidenav';
// import '@angular2-material/slide-toggle';
// import '@angular2-material/tabs';
// import '@angular2-material/toolbar';

//              ___                        _            _       _
//             |__ \                      | |          (_)     | |
//  _ __   __ _   ) |_____ _ __ ___   __ _| |_ ___ _ __ _  __ _| |
// | '_ \ / _` | / /______| '_ ` _ \ / _` | __/ _ \ '__| |/ _` | |
// | | | | (_| |/ /_      | | | | | | (_| | ||  __/ |  | | (_| | |
// |_| |_|\__, |____|     |_| |_| |_|\__,_|\__\___|_|  |_|\__,_|_|
//         __/ |
//        |___/
import 'ng2-material';

if ('production' === ENV) {
  // Production


} else {
  // Development

}

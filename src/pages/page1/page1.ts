import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
// import * as loginActions from '../../actions/login.action'
// import * as textItemActions from '../../actions/textitem.action'

// const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Component({
  templateUrl: 'page1.html'
})
export class Page1 {
  // items: FirebaseListObservable<any[]>;

  constructor(
    // public af: AngularFire,
    public navCtrl: NavController,
    // private store: Store<fromRoot.State>,
  ) {
    // this.items = af.database.list(FIREBASE_CURRENT_TODOS);
    /*    
          .subscribe(x => {
            console.log('x>', x);
          });
    */

    // store.dispatch(new loginActions.AnonymousAuthenticationAction());
    // store.dispatch(new textItemActions.LoadCollectionAction());
  }
}

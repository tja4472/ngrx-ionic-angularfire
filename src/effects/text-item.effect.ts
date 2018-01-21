import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  LoadCollectionSuccessAction,
  TextItemActionTypes,
} from '../actions/text-item.action';
import { TextItem } from '../models';
import { State } from '../reducers';

@Injectable()
export class TextItemEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public afDb: AngularFireDatabase,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  public loadCollection$ = this.actions$
    .ofType(TextItemActionTypes.LoadCollection)
    // This will cause the effect to run once immediately on startup
    // .startWith(new LoadCollectionAction())
    .do((x) => {
      console.log('Effect:loadCollection$:A', x);
    })
    .withLatestFrom(this.state$)
    // tslint:disable-next-line:no-unused-variable
    .filter(([action, state]) => (state as State).login.isAuthenticated)
    // Watch database node and get TextItems.
    .switchMap(() => this.afDb.list('/textItems').valueChanges())
    .do((x) => {
      console.log('Effect:loadCollection$:B', x);
    })
    .map((textItems: TextItem[]) => new LoadCollectionSuccessAction(textItems));
}

//   .withLatestFrom(this.store.select('masterGain'))
// .withLatestFrom(this.state$, (action, state) => state.aaa)

/*
  @Effect() redirectAfterLogin$ = this.actions$
    .ofType(AuthActions.REDIRECT_AFTER_LOGIN)
    .withLatestFrom(this.store.let(appSelectors.getAuthRedirectUrl()))
    .do(([action, url]) => router.navigateByUrl.next(url))
    .mapTo(this.authActions.resetRedirectAfterLogin())
*/

/*
@Injectable()
export class UserService implements OnDestroy {
  // our subscription(s) to @ngrx/effects
  private subscription: Subscription;

  constructor(private router: Router, private actions$: Actions, private store$: Store<AppState>) {
    this.subscription = mergeEffects(this).subscribe(store$);
  }

  @Effect({dispatch: false}) usr_connect$ = this.actions$
    .ofType(USR_CONNECT)
    .withLatestFrom(this.store$)
    .do(([action, state]) => {console.log(state)})
    .do(() => this.router.navigate(['/petals-cockpit']));

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
*/

// http://stackoverflow.com/search?q=%5Bngrx%5D+withlatestfrom
// https://github.com/teropa/harmonics-explorer/blob/master/src/app/services/audio.service.ts

/*
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

 @Effect() bar$ = this.actions$
    .ofType(ActionTypes.FOO)
    .withLatestFrom(this.store, (action, state) => state.user.isCool)
    .distinctUntilChanged()
    .filter(x => x)
    .map(() => ({ type: ActionTypes.BAR }));
    */

/*
  @Effect() update$ = this.action$
    .ofType('UPDATE_NOTE_TEXT', 'UPDATE_NOTE_POSITION', 'ADD_NOTE')
    .withLatestFrom(this.store.select('notes'))
    .mergeMap(notes => Observable.from(notes))
    .filter((note:Note) => {return (note.dirty==true)})
    .switchMap((updatedNote:Note) => this.notesDataService.addOrUpdateNote(updatedNote)
      .map((responseNote:Note) => ({ type: "UPDATE_NOTE_FROM_SERVER", payload: { note: responseNote } }))
      .catch(() => Observable.of({ type: "UPDATE_FAILED" }))
    )
*/

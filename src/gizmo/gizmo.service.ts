import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import {
  // AddGizmo,
  DatabaseDeleteItem,
  DatabaseStartListeningForData,
  DatabaseUpsertItem,
  // UpdateGizmo,
} from './gizmo.actions';
import { Gizmo } from './gizmo.model';

@Injectable()
export class GizmoService {
  constructor(private store: Store<FromRootReducer.State>) {
    this.ListenForData();
  }

  public getData$(): Observable<ReadonlyArray<Gizmo>> {
    return this.store.select(FromRootReducer.selectAllGizmos);
  }

  public ListenForData(): void {
    this.store.dispatch(new DatabaseStartListeningForData());
  }
  /*
  public add(item: Gizmo) {
    this.store.dispatch(new AddGizmo({ gizmo: item }));
  }
*/
  public deleteItem(item: Gizmo) {
    this.store
      .select(FromRootReducer.getLoginState)
      .take(1)
      .subscribe((loginState) => {
        const userId = 'dummyId';
        this.store.dispatch(new DatabaseDeleteItem({ id: item.id, userId }));
      });
  }
  /*
  public update(item: Gizmo) {
    this.store.dispatch(
      new UpdateGizmo({ gizmo: { id: item.id, changes: item } }),
    );
  }
*/
  /*
  Best practice is to provide the user as part of the payload as mentioned
  instead of selecting it from the state in the effect. This keeps the Effect
  pure and easier to test. You can also write a selector that composes the two
  pieces of data together for your action.
  https://github.com/ngrx/platform/issues/496#issuecomment-337781385
  */
  public upsert(item: Gizmo) {
    //
    this.store
      .select(FromRootReducer.getLoginState)
      .take(1)
      .subscribe((loginState) => {
        const userId = 'dummyId';
        this.store.dispatch(new DatabaseUpsertItem({ item, userId }));
      });
  }

  public isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getGizmoLoaded);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getGizmoLoading);
  }
}

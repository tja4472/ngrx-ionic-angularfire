import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import {
  AddGizmo,
  AListenForData,
  DatabaseDeleteItem,
  DatabaseUpsertItem,
  UpdateGizmo,
} from './gizmo.actions';
import { IGizmo } from './gizmo.model';

@Injectable()
export class GizmoService {
  constructor(private store: Store<FromRootReducer.IState>) {
    this.ListenForData();
  }

  public getData$(): Observable<IGizmo[]> {
    return this.store.select(FromRootReducer.selectAllGizmos);
  }

  public ListenForData(): void {
    this.store.dispatch(new AListenForData());
  }

  public add(item: IGizmo) {
    item.id = new Date().toString();
    this.store.dispatch(new AddGizmo({ gizmo: item }));
  }

  public deleteItem(item: IGizmo) {
    this.store
      .select(FromRootReducer.getLoginState)
      .take(1)
      .subscribe((loginState) => {
        const userId = 'dummyId';
        this.store.dispatch(new DatabaseDeleteItem({ id: item.id, userId }));
      });
  }

  public update(item: IGizmo) {
    this.store.dispatch(
      new UpdateGizmo({ gizmo: { id: item.id, changes: item } }),
    );
  }

  /*
  Best practice is to provide the user as part of the payload as mentioned
  instead of selecting it from the state in the effect. This keeps the Effect
  pure and easier to test. You can also write a selector that composes the two
  pieces of data together for your action.
  https://github.com/ngrx/platform/issues/496#issuecomment-337781385
  */
  public upsert(item: IGizmo) {
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

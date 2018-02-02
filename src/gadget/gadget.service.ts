import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import * as FromRootReducer from '../reducers/index';
import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  UpsertItem,
} from './gadget.actions';
import { Gadget } from './gadget.model';

@Injectable()
export class GadgetService {
  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<Gadget[]> {
    return this.store.select(FromRootReducer.selectAllGadgets);
  }

  public ListenForDataStart(): void {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((loginState) => {
        if (loginState.isAuthenticated) {
          this.store.dispatch(
            new DatabaseListenForDataStart({ userId: loginState.userId }),
          );
        }
      });
  }

  public ListenForDataStop(): void {
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: Gadget) {
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((loginState) => {
        // const userId = 'dummyId';
        this.store.dispatch(
          new DeleteItem({ id: item.id, userId: loginState.userId }),
        );
      });
  }

  public upsertItem(item: Gadget) {
    //
    this.store
      .select(FromRootReducer.getAuthState)
      .pipe(take(1))
      .subscribe((loginState) => {
        // const userId = 'dummyId';
        this.store.dispatch(
          new UpsertItem({ item, userId: loginState.userId }),
        );
      });
  }

  public isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getGadgetLoaded);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getGadgetLoading);
  }
}

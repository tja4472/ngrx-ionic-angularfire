import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
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
    //
    return this.store.pipe(select(FromRootReducer.selectAllGadgets));
  }

  public ListenForDataStart(): void {
    //
    this.store
      .pipe(select(FromRootReducer.getAuthState), take(1))
      .subscribe((authState) => {
        if (authState.isAuthenticated) {
          this.store.dispatch(
            new DatabaseListenForDataStart({ userId: authState.userId }),
          );
        }
      });
  }

  public ListenForDataStop(): void {
    //
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: Gadget) {
    //
    this.store
      .pipe(select(FromRootReducer.getAuthState), take(1))
      .subscribe((authState) => {
        this.store.dispatch(
          new DeleteItem({ id: item.id, userId: authState.userId }),
        );
      });
  }

  public upsertItem(item: Gadget) {
    //
    this.store
      .pipe(select(FromRootReducer.getAuthState), take(1))
      .subscribe((authState) => {
        this.store.dispatch(new UpsertItem({ item, userId: authState.userId }));
      });
  }

  public isLoaded(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getGadgetLoaded));
  }

  public isLoading(): Observable<boolean> {
    return this.store.pipe(select(FromRootReducer.getGadgetLoading));
  }
}

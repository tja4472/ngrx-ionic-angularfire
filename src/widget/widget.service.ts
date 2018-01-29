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
} from './widget.actions';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<Widget[]> {
    return this.store.select(FromRootReducer.selectAllWidgets);
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

  public deleteItem(item: Widget) {
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

  public upsertItem(item: Widget) {
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
    return this.store.select(FromRootReducer.getWidgetLoaded);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getWidgetLoading);
  }
}

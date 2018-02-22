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
} from './widget.actions';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<Widget[]> {
    //
    return this.store.pipe(select(FromRootReducer.selectAllWidgets));
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

  public deleteItem(item: Widget) {
    //
    this.store
      .pipe(select(FromRootReducer.getAuthState), take(1))
      .subscribe((authState) => {
        this.store.dispatch(
          new DeleteItem({ id: item.id, userId: authState.userId }),
        );
      });
  }

  public upsertItem(item: Widget) {
    //
    this.store
      .pipe(select(FromRootReducer.getAuthState), take(1))
      .subscribe((authState) => {
        this.store.dispatch(new UpsertItem({ item, userId: authState.userId }));
      });
  }

  public isLoaded(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getWidgetLoaded));
  }

  public isLoading(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getWidgetLoading));
  }
}

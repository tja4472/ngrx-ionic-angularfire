import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, take } from 'rxjs/operators';

import * as FromAuthSelector from '../app/auth/auth.selector';
import * as FromRootReducer from '../reducers';
import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  UpsertItem,
} from './widget.actions';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  //
  private init$ = this.store.pipe(
    select(FromAuthSelector.getUserId),
    filter((userId) => userId !== ''),
  );

  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<Widget[]> {
    //
    return this.store.pipe(select(FromRootReducer.selectAllWidgets));
  }

  public ListenForDataStart(): void {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DatabaseListenForDataStart({ userId }));
    });
  }

  public ListenForDataStop(): void {
    //
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: Widget) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DeleteItem({ id: item.id, userId }));
    });
  }

  public upsertItem(item: Widget) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new UpsertItem({ item, userId }));
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

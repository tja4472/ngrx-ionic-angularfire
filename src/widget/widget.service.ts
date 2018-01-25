import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import {
  DeleteItem,
  StartListeningForData,
  UpsertItem,
} from './widget.actions';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  constructor(private store: Store<FromRootReducer.State>) {
    this.StartListeningForData();
  }

  public getData$(): Observable<Widget[]> {
    return this.store.select(FromRootReducer.selectAllWidgets);
  }

  public StartListeningForData(): void {
    this.store.dispatch(new StartListeningForData());
  }

  public deleteItem(item: Widget) {
    this.store.dispatch(new DeleteItem({ id: item.id }));
  }

  public upsertItem(item: Widget) {
    this.store.dispatch(new UpsertItem({ item }));
  }

  public isLoaded(): Observable<boolean> {
    return this.store.select(FromRootReducer.getWidgetLoaded);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(FromRootReducer.getWidgetLoading);
  }
}

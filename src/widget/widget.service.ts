import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import {
  AddWidget,
  AListenForData,
  AUpsertItem,
  DeleteItem,
  UpdateWidget,
} from './widget.actions';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  constructor(private store: Store<FromRootReducer.State>) {
    this.ListenForData();
  }

  public getData$(): Observable<Widget[]> {
    return this.store.select(FromRootReducer.selectAllWidgets);
  }

  public ListenForData(): void {
    this.store.dispatch(new AListenForData());
  }

  public add(item: Widget) {
    this.store.dispatch(new AddWidget({ widget: item }));
  }

  public deleteItem(item: Widget) {
    this.store.dispatch(new DeleteItem({ id: item.id }));
  }

  public update(item: Widget) {
    this.store.dispatch(
      new UpdateWidget({ widget: { id: item.id, changes: item } }),
    );
  }

  public upsert(item: Widget) {
    this.store.dispatch(new AUpsertItem({ item }));
    /*
    if (item.id === '') {
      this.add(item);
    } else {
      this.update(item);
    }
    */
  }
}

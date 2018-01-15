import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import { IWidget } from './widget.model';
import {
  AddWidget,
  A_DeleteItem,
  A_ListenForData,
  A_UpsertItem,
  UpdateWidget,
} from './widget.actions';

@Injectable()
export class WidgetService {
  constructor(private store: Store<FromRootReducer.State>) {
    this.ListenForData();
  }

  public getData$(): Observable<IWidget[]> {
    return this.store.select(FromRootReducer.selectAllWidgets);
  }

  public ListenForData(): void {
    this.store.dispatch(new A_ListenForData());
  }

  public add(item: IWidget) {
    item.id = new Date().toString();
    this.store.dispatch(new AddWidget({ widget: item }));
  }

  public deleteItem(item: IWidget) {
    this.store.dispatch(new A_DeleteItem({ id: item.id }));
  }

  public update(item: IWidget) {
    this.store.dispatch(
      new UpdateWidget({ widget: { id: item.id, changes: item } })
    );
  }

  public upsert(item: IWidget) {
    this.store.dispatch(new A_UpsertItem({ item }));
    /*
    if (item.id === '') {
      this.add(item);
    } else {
      this.update(item);
    }
    */
  }
}

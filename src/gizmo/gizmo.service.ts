import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FromRootReducer from '../reducers/index';
import {
  AddGizmo,
  AListenForData,
  AUpsertItem,
  DeleteItem,
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
    this.store.dispatch(new DeleteItem({ id: item.id }));
  }

  public update(item: IGizmo) {
    this.store.dispatch(
      new UpdateGizmo({ gizmo: { id: item.id, changes: item } }),
    );
  }

  public upsert(item: IGizmo) {
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

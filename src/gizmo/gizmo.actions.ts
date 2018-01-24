// tslint:disable:max-classes-per-file
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Gizmo } from './gizmo.model';

export enum GizmoActionTypes {
  //
  DATABASE_DELETE_ITEM = '[Gizmo] (Database) Delete Item',
  DATABASE_LISTEN_FOR_ADDED_ITEMS = '[Gizmo] (Database) Listen For Added Items',
  DATABASE_LISTEN_FOR_MODIFIED_ITEMS = '[Gizmo] (Database) Listen For Modified Items',
  DATABASE_LISTEN_FOR_REMOVED_ITEMS = '[Gizmo] (Database) Listen For Removed Items',
  DATABASE_START_LISTENING_FOR_DATA = '[Gizmo] (Database) Start Listening For Data',
  DATABASE_STOP_LISTENING_FOR_DATA = '[Gizmo] (Database) Stop listening For Data',
  DATABASE_UPSERT_ITEM = '[Gizmo] (Database) Upsert item',
  //
  STORE_ADD_ITEMS = '[Gizmo] (Store) Add Items',
  STORE_DELETE_ITEMS = '[Gizmo] (Store) Delete Items',
  STORE_UPDATE_ITEMS = '[Gizmo] (Store) Update Items',
}

export class DatabaseDeleteItem implements Action {
  public readonly type = GizmoActionTypes.DATABASE_DELETE_ITEM;

  constructor(public payload: { id: string; userId: string }) {}
}

export class DatabaseListenForAddedItems implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_ADDED_ITEMS;
}

export class DatabaseListenForModifiedItems implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_MODIFIED_ITEMS;
}

export class DatabaseListenForRemovedItems implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_REMOVED_ITEMS;
}

export class DatabaseStartListeningForData implements Action {
  public readonly type = GizmoActionTypes.DATABASE_START_LISTENING_FOR_DATA;
}

export class DatabaseStopListeningForData implements Action {
  public readonly type = GizmoActionTypes.DATABASE_STOP_LISTENING_FOR_DATA;
}

export class DatabaseUpsertItem implements Action {
  public readonly type = GizmoActionTypes.DATABASE_UPSERT_ITEM;

  constructor(
    public payload: {
      item: Gizmo;
      userId: string;
    },
  ) {}
}

export class StoreAddItems implements Action {
  public readonly type = GizmoActionTypes.STORE_ADD_ITEMS;

  constructor(public payload: { gizmos: Gizmo[] }) {}
}

export class StoreDeleteItems implements Action {
  public readonly type = GizmoActionTypes.STORE_DELETE_ITEMS;

  constructor(public payload: { ids: string[] }) {}
}

export class StoreUpdateItems implements Action {
  public readonly type = GizmoActionTypes.STORE_UPDATE_ITEMS;

  constructor(
    // public payload: { gizmos: Array<{ id: string; changes: Gizmo }> },
    public payload: { items: Array<Update<Gizmo>> },
  ) {}
}

export type GizmoActions =
  | DatabaseDeleteItem
  | DatabaseListenForAddedItems
  | DatabaseListenForModifiedItems
  | DatabaseListenForRemovedItems
  | DatabaseStartListeningForData
  | DatabaseStopListeningForData
  | DatabaseUpsertItem
  | StoreAddItems
  | StoreUpdateItems
  | StoreDeleteItems;

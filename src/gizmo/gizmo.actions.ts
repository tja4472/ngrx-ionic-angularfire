// tslint:disable:max-classes-per-file
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Gizmo } from './gizmo.model';

export enum GizmoActionTypes {
  //
  DATABASE_DELETE_ITEM = '[Gizmo] (Database) Delete Item',
  DATABASE_LISTEN_FOR_ADDED_ITEMS = '[Gizmo] (Database) Listen For Added Items',
  DATABASE_LISTEN_FOR_DATA_START = '[Gizmo] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Gizmo] (Database) Listen For Data - Stop',
  DATABASE_LISTEN_FOR_MODIFIED_ITEMS = '[Gizmo] (Database) Listen For Modified Items',
  DATABASE_LISTEN_FOR_REMOVED_ITEMS = '[Gizmo] (Database) Listen For Removed Items',
  DATABASE_UPSERT_ITEM = '[Gizmo] (Database) Upsert Item',
  DATABASE_UPSERT_ITEM_ERROR = '[Gizmo] (Database) Upsert Item - Error ',
  DATABASE_UPSERT_ITEM_SUCCESS = '[Gizmo] (Database) Upsert Item - Success',
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

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStart implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}
export class DatabaseListenForModifiedItems implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_MODIFIED_ITEMS;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForRemovedItems implements Action {
  public readonly type = GizmoActionTypes.DATABASE_LISTEN_FOR_REMOVED_ITEMS;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
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

export class DatabaseUpsertItemError implements Action {
  public readonly type = GizmoActionTypes.DATABASE_UPSERT_ITEM_ERROR;

  constructor(
    public payload: {
      error: {
        code: string;
        message: string;
        name: string;
      };
    },
  ) {}
}

export class DatabaseUpsertItemSuccess implements Action {
  public readonly type = GizmoActionTypes.DATABASE_UPSERT_ITEM_SUCCESS;
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
  | DatabaseListenForDataStart
  | DatabaseListenForDataStop
  | DatabaseListenForModifiedItems
  | DatabaseListenForRemovedItems
  | DatabaseUpsertItem
  | StoreAddItems
  | StoreUpdateItems
  | StoreDeleteItems;

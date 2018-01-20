// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
// ngrx v5 import { Update } from '@ngrx/entity';
import { IGizmo } from './gizmo.model';

export enum GizmoActionTypes {
  //
  A_LISTEN_FOR_ADDED_ITEMS = '[Gizmo] Listen For Added Items',
  A_LISTEN_FOR_DATA = '[Gizmo] Listen For Data',
  A_LISTEN_FOR_MODIFIED_ITEMS = '[Gizmo] Listen For Modified Items',
  A_LISTEN_FOR_REMOVED_ITEMS = '[Gizmo] Listen For Removed Items',
  A_UNLISTEN_FOR_DATA = '[Gizmo] Unlisten For Data',
  DATABASE_DELETE_ITEM = '[Gizmo] (Database) Delete Item',
  DATABASE_UPSERT_ITEM = '[Gizmo] (Database) Upsert item',
  //
  LOAD_GIZMOS = '[Gizmo] Load Gizmos',
  ADD_GIZMO = '[Gizmo] Add Gizmo',
  ADD_GIZMOS = '[Gizmo] Add Gizmos',
  UPDATE_GIZMO = '[Gizmo] Update Gizmo',
  STORE_ADD_ITEMS = '[Gizmo] (Store) Add Items',
  STORE_DELETE_ITEMS = '[Gizmo] (Store) Delete Items',
  STORE_UPDATE_ITEMS = '[Gizmo] (Store) Update Items',
  DELETE_GIZMO = '[Gizmo] Delete Gizmo',

  CLEAR_GIZMOS = '[Gizmo] Clear Gizmos',
}
//
export class AListenForAddedItems implements Action {
  public readonly type = GizmoActionTypes.A_LISTEN_FOR_ADDED_ITEMS;
}

export class AListenForData implements Action {
  public readonly type = GizmoActionTypes.A_LISTEN_FOR_DATA;
}

export class AListenForModifiedItems implements Action {
  public readonly type = GizmoActionTypes.A_LISTEN_FOR_MODIFIED_ITEMS;
}

export class AListenForRemovedItems implements Action {
  public readonly type = GizmoActionTypes.A_LISTEN_FOR_REMOVED_ITEMS;
}

export class AUnlistenForData implements Action {
  public readonly type = GizmoActionTypes.A_UNLISTEN_FOR_DATA;
}

export class DatabaseDeleteItem implements Action {
  public readonly type = GizmoActionTypes.DATABASE_DELETE_ITEM;

  constructor(public payload: { id: string; userId: string }) {}
}

export class DatabaseUpsertItem implements Action {
  public readonly type = GizmoActionTypes.DATABASE_UPSERT_ITEM;

  constructor(
    public payload: {
      item: IGizmo;
      userId: string;
    },
  ) {}
}
//
export class LoadGizmos implements Action {
  public readonly type = GizmoActionTypes.LOAD_GIZMOS;

  constructor(public payload: { gizmos: IGizmo[] }) {}
}

export class AddGizmo implements Action {
  public readonly type = GizmoActionTypes.ADD_GIZMO;

  constructor(public payload: { gizmo: IGizmo }) {}
}

export class AddGizmos implements Action {
  public readonly type = GizmoActionTypes.ADD_GIZMOS;

  constructor(public payload: { gizmos: IGizmo[] }) {}
}

export class UpdateGizmo implements Action {
  public readonly type = GizmoActionTypes.UPDATE_GIZMO;

  constructor(public payload: { gizmo: { id: string; changes: IGizmo } }) {}
}
export class StoreAddItems implements Action {
  public readonly type = GizmoActionTypes.STORE_ADD_ITEMS;

  constructor(public payload: { gizmos: IGizmo[] }) {}
}

export class StoreDeleteItems implements Action {
  public readonly type = GizmoActionTypes.STORE_DELETE_ITEMS;

  constructor(public payload: { ids: string[] }) {}
}

export class StoreUpdateItems implements Action {
  public readonly type = GizmoActionTypes.STORE_UPDATE_ITEMS;

  constructor(
    public payload: { gizmos: Array<{ id: string; changes: IGizmo }> },
  ) {}
}

export class DeleteGizmo implements Action {
  public readonly type = GizmoActionTypes.DELETE_GIZMO;

  constructor(public payload: { id: string }) {}
}

export class ClearGizmos implements Action {
  public readonly type = GizmoActionTypes.CLEAR_GIZMOS;
}

export type GizmoActions =
  | AListenForData
  | StoreAddItems
  | LoadGizmos
  | AddGizmo
  | AddGizmos
  | UpdateGizmo
  | StoreUpdateItems
  | DeleteGizmo
  | StoreDeleteItems
  | ClearGizmos;

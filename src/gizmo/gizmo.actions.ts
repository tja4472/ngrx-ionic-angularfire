// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
// ngrx v5 import { Update } from '@ngrx/entity';
import { IGizmo } from './gizmo.model';

export enum GizmoActionTypes {
  //
  A_DELETE_ITEM = '[Gizmo] Delete Item',
  A_LISTEN_FOR_DATA = '[Gizmo] Listen For Data',
  A_LOAD_SUCCESS = '[Gizmo] Load Success',
  A_UNLISTEN_FOR_DATA = '[Gizmo] Unlisten For Data',
  A_UPSERT_ITEM = '[Gizmo] Upsert item',
  //
  LOAD_GIZMOS = '[Gizmo] Load Gizmos',
  ADD_GIZMO = '[Gizmo] Add Gizmo',
  ADD_GIZMOS = '[Gizmo] Add Gizmos',
  UPDATE_GIZMO = '[Gizmo] Update Gizmo',
  UPDATE_GIZMOS = '[Gizmo] Update Gizmos',
  DELETE_GIZMO = '[Gizmo] Delete Gizmo',
  DELETE_GIZMOS = '[Gizmo] Delete Gizmos',
  CLEAR_GIZMOS = '[Gizmo] Clear Gizmos',
}
//
export class DeleteItem implements Action {
  public readonly type = GizmoActionTypes.A_DELETE_ITEM;

  constructor(public payload: { id: string }) {}
}

export class AListenForData implements Action {
  public readonly type = GizmoActionTypes.A_LISTEN_FOR_DATA;
}

export class ALoadSuccess implements Action {
  public readonly type = GizmoActionTypes.A_LOAD_SUCCESS;

  constructor(public payload: { gizmos: IGizmo[] }) {}
}

export class AUnlistenForData implements Action {
  public readonly type = GizmoActionTypes.A_UNLISTEN_FOR_DATA;
}

export class AUpsertItem implements Action {
  public readonly type = GizmoActionTypes.A_UPSERT_ITEM;

  constructor(public payload: { item: IGizmo }) {}
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

/* ngrx v5
export class UpdateGizmo implements Action {
  readonly type = GizmoActionTypes.UPDATE_GIZMO;

  constructor(public payload: { gizmo: Update<IGizmo> }) {}
}

export class UpdateGizmos implements Action {
  readonly type = GizmoActionTypes.UPDATE_GIZMOS;

  constructor(public payload: { gizmos: Update<IGizmo>[] }) {}
}
*/

export class DeleteGizmo implements Action {
  public readonly type = GizmoActionTypes.DELETE_GIZMO;

  constructor(public payload: { id: string }) {}
}

export class DeleteGizmos implements Action {
  public readonly type = GizmoActionTypes.DELETE_GIZMOS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearGizmos implements Action {
  public readonly type = GizmoActionTypes.CLEAR_GIZMOS;
}

export type GizmoActions =
  | ALoadSuccess
  | LoadGizmos
  | AddGizmo
  | AddGizmos
  | UpdateGizmo
  // ngrx v5 | UpdateGizmo
  // ngrx v5 | UpdateGizmos
  | DeleteGizmo
  | DeleteGizmos
  | ClearGizmos;

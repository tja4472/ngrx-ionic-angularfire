import { Action } from '@ngrx/store';
// ngrx v5 import { Update } from '@ngrx/entity';
import { IWidget } from './widget.model';

export enum WidgetActionTypes {
  //
  A_DELETE_ITEM = '[Widget] Delete Item',
  A_LISTEN_FOR_DATA = '[Widget] Listen For Data',
  A_LOAD_SUCCESS = '[Widget] Load Success',
  A_UNLISTEN_FOR_DATA = '[Widget] Unlisten For Data',
  A_UPSERT_ITEM = '[Widget] Upsert item',
  //
  LOAD_WIDGETS = '[Widget] Load Widgets',
  ADD_WIDGET = '[Widget] Add Widget',
  ADD_WIDGETS = '[Widget] Add Widgets',
  UPDATE_WIDGET = '[Widget] Update Widget',
  UPDATE_WIDGETS = '[Widget] Update Widgets',
  DELETE_WIDGET = '[Widget] Delete Widget',
  DELETE_WIDGETS = '[Widget] Delete Widgets',
  CLEAR_WIDGETS = '[Widget] Clear Widgets',
}
//
export class A_DeleteItem implements Action {
  readonly type = WidgetActionTypes.A_DELETE_ITEM;

  constructor(public payload: { id: string }) {}
}

export class A_ListenForData implements Action {
  readonly type = WidgetActionTypes.A_LISTEN_FOR_DATA;
}

export class A_LoadSuccess implements Action {
  readonly type = WidgetActionTypes.A_LOAD_SUCCESS;

  constructor(public payload: { widgets: IWidget[] }) {}
}

export class A_UnlistenForData implements Action {
  readonly type = WidgetActionTypes.A_UNLISTEN_FOR_DATA;
}

export class A_UpsertItem implements Action {
  readonly type = WidgetActionTypes.A_UPSERT_ITEM;

  constructor(public payload: { item: IWidget }) {}
}
//
export class LoadWidgets implements Action {
  readonly type = WidgetActionTypes.LOAD_WIDGETS;

  constructor(public payload: { widgets: IWidget[] }) {}
}

export class AddWidget implements Action {
  readonly type = WidgetActionTypes.ADD_WIDGET;

  constructor(public payload: { widget: IWidget }) {}
}

export class AddWidgets implements Action {
  readonly type = WidgetActionTypes.ADD_WIDGETS;

  constructor(public payload: { widgets: IWidget[] }) {}
}

export class UpdateWidget implements Action {
  readonly type = WidgetActionTypes.UPDATE_WIDGET;

  constructor(public payload: { widget: { id: string; changes: IWidget } }) {}
}

/* ngrx v5 
export class UpdateWidget implements Action {
  readonly type = WidgetActionTypes.UPDATE_WIDGET;

  constructor(public payload: { widget: Update<IWidget> }) {}
}

export class UpdateWidgets implements Action {
  readonly type = WidgetActionTypes.UPDATE_WIDGETS;

  constructor(public payload: { widgets: Update<IWidget>[] }) {}
}
*/

export class DeleteWidget implements Action {
  readonly type = WidgetActionTypes.DELETE_WIDGET;

  constructor(public payload: { id: string }) {}
}

export class DeleteWidgets implements Action {
  readonly type = WidgetActionTypes.DELETE_WIDGETS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWidgets implements Action {
  readonly type = WidgetActionTypes.CLEAR_WIDGETS;
}

export type WidgetActions =
  | A_LoadSuccess
  | LoadWidgets
  | AddWidget
  | AddWidgets
  | UpdateWidget
  // ngrx v5 | UpdateWidget
  // ngrx v5 | UpdateWidgets
  | DeleteWidget
  | DeleteWidgets
  | ClearWidgets;

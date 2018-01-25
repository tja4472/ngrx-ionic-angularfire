// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Widget } from './widget.model';

export enum WidgetActionTypes {
  //
  DELETE_ITEM = '[Widget] Delete Item',
  LOAD_SUCCESS = '[Widget] Load Success',
  START_LISTENING_FOR_DATA = '[Widget] Start Listening For Data',
  STOP_LISTENING_FOR_DATA = '[Widget] Stop listening For Data',
  UPSERT_ITEM = '[Widget] Upsert item',
}

export class DeleteItem implements Action {
  public readonly type = WidgetActionTypes.DELETE_ITEM;

  constructor(public payload: { id: string }) {}
}

export class LoadSuccess implements Action {
  public readonly type = WidgetActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: Widget[] }) {}
}

export class StartListeningForData implements Action {
  public readonly type = WidgetActionTypes.START_LISTENING_FOR_DATA;
}

export class StopListeningForData implements Action {
  public readonly type = WidgetActionTypes.STOP_LISTENING_FOR_DATA;
}

export class UpsertItem implements Action {
  public readonly type = WidgetActionTypes.UPSERT_ITEM;

  constructor(public payload: { item: Widget }) {}
}
export type WidgetActions =
  | DeleteItem
  | LoadSuccess
  | StartListeningForData
  | StopListeningForData
  | UpsertItem;

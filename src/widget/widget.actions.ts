// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Widget } from './widget.model';

export enum WidgetActionTypes {
  //
  DATABASE_LISTEN_FOR_DATA_START = '[Widget] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_START_ERROR = '[Widget] (Database) Listen For Data - Start - Error',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Widget] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[Widget] Delete Item',
  LOAD_SUCCESS = '[Widget] Load Success',
  UPSERT_ITEM = '[Widget] Upsert item',
  UPSERT_ITEM_ERROR = '[Widget] Upsert Item - Error ',
  UPSERT_ITEM_SUCCESS = '[Widget] Upsert Item - Success',
}

export class DatabaseListenForDataStart implements Action {
  public readonly type = WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStartError implements Action {
  public readonly type = WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_START_ERROR;

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

export class DatabaseListenForDataStop implements Action {
  public readonly type = WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}

export class DeleteItem implements Action {
  public readonly type = WidgetActionTypes.DELETE_ITEM;

  constructor(public payload: { id: string; userId: string }) {}
}

export class LoadSuccess implements Action {
  public readonly type = WidgetActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: Widget[] }) {}
}

export class UpsertItem implements Action {
  public readonly type = WidgetActionTypes.UPSERT_ITEM;

  constructor(public payload: { item: Widget; userId: string }) {}
}

export class UpsertItemError implements Action {
  public readonly type = WidgetActionTypes.UPSERT_ITEM_ERROR;

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

export class UpsertItemSuccess implements Action {
  public readonly type = WidgetActionTypes.UPSERT_ITEM_SUCCESS;
}

export type WidgetActions =
  | DeleteItem
  | LoadSuccess
  | DatabaseListenForDataStart
  | DatabaseListenForDataStartError
  | DatabaseListenForDataStop
  | UpsertItem
  | UpsertItemError
  | UpsertItemSuccess;

// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Gadget } from './gadget.model';

export enum GadgetActionTypes {
  //
  DATABASE_LISTEN_FOR_DATA_START = '[Gadget] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_START_ERROR = '[Gadget] (Database) Listen For Data - Start - Error',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Gadget] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[Gadget] Delete Item',
  LOAD_SUCCESS = '[Gadget] Load Success',
  UPSERT_ITEM = '[Gadget] Upsert item',
  UPSERT_ITEM_ERROR = '[Gadget] Upsert Item - Error ',
  UPSERT_ITEM_SUCCESS = '[Gadget] Upsert Item - Success',
}

export class DatabaseListenForDataStart implements Action {
  public readonly type = GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStartError implements Action {
  public readonly type = GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_START_ERROR;

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
  public readonly type = GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}

export class DeleteItem implements Action {
  public readonly type = GadgetActionTypes.DELETE_ITEM;

  constructor(public payload: { id: string; userId: string }) {}
}

export class LoadSuccess implements Action {
  public readonly type = GadgetActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: Gadget[] }) {}
}

export class UpsertItem implements Action {
  public readonly type = GadgetActionTypes.UPSERT_ITEM;

  constructor(public payload: { item: Gadget; userId: string }) {}
}

export class UpsertItemError implements Action {
  public readonly type = GadgetActionTypes.UPSERT_ITEM_ERROR;

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
  public readonly type = GadgetActionTypes.UPSERT_ITEM_SUCCESS;
}

export type GadgetActions =
  | DeleteItem
  | LoadSuccess
  | DatabaseListenForDataStart
  | DatabaseListenForDataStartError
  | DatabaseListenForDataStop
  | UpsertItem
  | UpsertItemError
  | UpsertItemSuccess;

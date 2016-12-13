import { Action } from '@ngrx/store';
import { TextItem } from '../models';
import { type } from '../utils/util';

// Update action types definitions in order to work with typescript 2.1.4
// https://github.com/ngrx/example-app/pull/88
export const ActionTypes = new class {
  readonly LOAD_COLLECTION = type('[TextItem] Load Collection');
  readonly LOAD_COLLECTION_SUCCESS = type('[TextItem] Load Collection Success');
};

export class LoadCollectionAction implements Action {
  readonly type = ActionTypes.LOAD_COLLECTION;

  constructor() { }
}

export class LoadCollectionSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_COLLECTION_SUCCESS;

  constructor(public payload: TextItem[]) { }
}

export type Actions =
  LoadCollectionAction |
  LoadCollectionSuccessAction;

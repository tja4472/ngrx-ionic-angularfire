import { Action } from '@ngrx/store';
import { TextItem } from '../models';
import { type } from '../utils/util';

export const ActionTypes = {
  LOAD_COLLECTION: type('[TextItem] Load Collection'),
  LOAD_COLLECTION_SUCCESS: type('[TextItem] Load Collection Success'),
};

export class LoadCollectionAction implements Action {
  type = ActionTypes.LOAD_COLLECTION;

  constructor() { }
}

export class LoadCollectionSuccessAction implements Action {
  type = ActionTypes.LOAD_COLLECTION_SUCCESS;

  constructor(public payload: TextItem[]) { }
}

export type Actions =
  LoadCollectionAction |
  LoadCollectionSuccessAction;

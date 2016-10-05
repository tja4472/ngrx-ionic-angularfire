import { Action } from '@ngrx/store';
import { TextItem } from '../models';
import { label } from '../utils/util';

export const TextItemActionTypes = {
  LOAD_COLLECTION: label('[TextItem] Load Collection'),
  LOAD_COLLECTION_SUCCESS: label('[TextItem] Load Collection Success'),
};

export class LoadCollectionAction implements Action {
  type = TextItemActionTypes.LOAD_COLLECTION;

  constructor() { }
}

export class LoadCollectionSuccessAction implements Action {
  type = TextItemActionTypes.LOAD_COLLECTION_SUCCESS;

  constructor(public payload: TextItem[]) { }
}

export type TextItemActions =
  LoadCollectionAction |
  LoadCollectionSuccessAction;

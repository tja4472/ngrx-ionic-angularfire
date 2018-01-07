import { Action } from '@ngrx/store';
import { TextItem } from '../models';

export const LOAD_COLLECTION = '[TextItem] Load Collection';
export const LOAD_COLLECTION_SUCCESS = '[TextItem] Load Collection Success';

export class LoadCollectionAction implements Action {
  readonly type = LOAD_COLLECTION;

  constructor() {}
}

export class LoadCollectionSuccessAction implements Action {
  readonly type = LOAD_COLLECTION_SUCCESS;

  constructor(public payload: TextItem[]) {}
}

export type Actions = LoadCollectionAction | LoadCollectionSuccessAction;

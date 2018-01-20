// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TextItem } from '../models';

export enum TextItemActionTypes {
  LoadCollection = '[TextItem] Load Collection',
  LoadCollectionSuccess = '[TextItem] Load Collection Success',
}

export class LoadCollectionAction implements Action {
  public readonly type = TextItemActionTypes.LoadCollection;

  constructor() {}
}

export class LoadCollectionSuccessAction implements Action {
  public readonly type = TextItemActionTypes.LoadCollectionSuccess;

  constructor(public payload: TextItem[]) {}
}

export type TextItemActions =
  | LoadCollectionAction
  | LoadCollectionSuccessAction;

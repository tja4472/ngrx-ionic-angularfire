import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
// import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as textItemAction from '../actions/text-item.action';
import { TextItem } from '../models';

import { assign } from '../utils/index';

export interface State {
  loaded: boolean;
  loading: boolean;
  textItems: TextItem[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  textItems: []
};

export function reducer(state = initialState, action: textItemAction.Actions): State {
  switch (action.type) {
    case textItemAction.ActionTypes.LOAD_COLLECTION: {
      return assign(state, {
        loading: true
      });
    }

    case textItemAction.ActionTypes.LOAD_COLLECTION_SUCCESS: {
      const books: TextItem[] = action.payload;

      return {
        loaded: true,
        loading: false,
        textItems: books.map(book => book)
      };
    }

    default: {
      return state;
    }
  }
}

export function getLoaded(state$: Observable<State>) {
  return state$.select(state => state.loaded);
}

export function getLoading(state$: Observable<State>) {
  return state$.select(state => state.loading);
}

export function getTextItems(state$: Observable<State>) {
  return state$.select(state => state.textItems);
}

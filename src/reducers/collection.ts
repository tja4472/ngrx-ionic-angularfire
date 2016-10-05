import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
// import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TextItemActions, TextItemActionTypes } from '../actions/textitem.action';
import { TextItem } from '../models';

import { assign } from '../utils';

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

export function reducer(state = initialState, action: TextItemActions): State {
  switch (action.type) {
    case TextItemActionTypes.LOAD_COLLECTION: {
      return assign(state, {
        loading: true
      });
    }

    case TextItemActionTypes.LOAD_COLLECTION_SUCCESS: {
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
  return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<State>) {
  return state$.select(s => s.loading);
}

export function getTextItems(state$: Observable<State>) {
  return state$.select(s => s.textItems);
}


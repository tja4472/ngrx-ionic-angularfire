import {
  TextItemActions,
  TextItemActionTypes,
} from '../actions/text-item.action';
import { TextItem } from '../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  textItems: TextItem[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  textItems: [],
};

export function reducer(state = initialState, action: TextItemActions): State {
  switch (action.type) {
    case TextItemActionTypes.LoadCollection: {
      return {
        ...state,
        loading: true,
      };
    }

    case TextItemActionTypes.LoadCollectionSuccess: {
      const books: TextItem[] = action.payload;

      return {
        loaded: true,
        loading: false,
        textItems: books.map((book) => book),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTextItems = (state: State) => state.textItems;

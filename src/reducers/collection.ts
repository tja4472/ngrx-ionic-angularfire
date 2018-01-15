import {
  TextItemActions,
  TextItemActionTypes,
} from '../actions/text-item.action';
import { ITextItem } from '../models';

export interface IState {
  loaded: boolean;
  loading: boolean;
  textItems: ITextItem[];
}

const initialState: IState = {
  loaded: false,
  loading: false,
  textItems: [],
};

export function reducer(state = initialState, action: TextItemActions): IState {
  switch (action.type) {
    case TextItemActionTypes.LoadCollection: {
      return {
        ...state,
        loading: true,
      };
    }

    case TextItemActionTypes.LoadCollectionSuccess: {
      const books: ITextItem[] = action.payload;

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

export const getLoaded = (state: IState) => state.loaded;
export const getLoading = (state: IState) => state.loading;
export const getTextItems = (state: IState) => state.textItems;

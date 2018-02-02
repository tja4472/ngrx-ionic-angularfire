import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { GadgetActions, GadgetActionTypes } from './gadget.actions';
import { Gadget } from './gadget.model';

export interface State extends EntityState<Gadget> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
  selectedGadgetId: string;
}

export const adapter: EntityAdapter<Gadget> = createEntityAdapter<Gadget>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedGadgetId: '',
});

export function reducer(state = initialState, action: GadgetActions): State {
  switch (action.type) {
    case GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_STOP: {
      return adapter.removeAll({
        ...state,
        loaded: false,
        loading: false,
        selectedGadgetId: '',
      });
    }

    case GadgetActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload.items, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedGadgetId = (state: State) => state.selectedGadgetId;

export const {
  // select the array of gadget ids
  selectIds: selectGadgetIds,

  // select the dictionary of gadget entities
  selectEntities: selectGadgetEntities,

  // select the array of gadgets
  selectAll: selectAllGadgets,

  // select the total gadget count
  selectTotal: selectGadgetTotal,
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { WidgetActions, WidgetActionTypes } from './widget.actions';
import { Widget } from './widget.model';

export interface State extends EntityState<Widget> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
  selectedWidgetId: string;
}

export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedWidgetId: '',
});

export function reducer(state = initialState, action: WidgetActions): State {
  switch (action.type) {
    case WidgetActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload.items, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedWidgetId = (state: State) => state.selectedWidgetId;

export const {
  // select the array of widget ids
  selectIds: selectWidgetIds,

  // select the dictionary of widget entities
  selectEntities: selectWidgetEntities,

  // select the array of widgets
  selectAll: selectAllWidgets,

  // select the total widget count
  selectTotal: selectWidgetTotal,
} = adapter.getSelectors();

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;

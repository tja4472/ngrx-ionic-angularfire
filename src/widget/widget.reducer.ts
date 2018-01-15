import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IWidget } from './widget.model';
import { WidgetActions, WidgetActionTypes } from './widget.actions';

export interface State extends EntityState<IWidget> {
  // additional entities state properties
  selectedWidgetId: string;
}

export const adapter: EntityAdapter<IWidget> = createEntityAdapter<IWidget>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedWidgetId: '',
});

export function reducer(state = initialState, action: WidgetActions): State {
  switch (action.type) {
    case WidgetActionTypes.ADD_WIDGET: {
      return adapter.addOne(action.payload.widget, state);
    }

    case WidgetActionTypes.ADD_WIDGETS: {
      return adapter.addMany(action.payload.widgets, state);
    }

    case WidgetActionTypes.UPDATE_WIDGET: {
      return adapter.updateOne(action.payload.widget, state);
    }    
    /* ngrx v5 
    case WidgetActionTypes.UPDATE_WIDGET: {
      return adapter.updateOne(action.payload.widget, state);
    }

    case WidgetActionTypes.UPDATE_WIDGETS: {
      return adapter.updateMany(action.payload.widgets, state);
    }
*/
    case WidgetActionTypes.DELETE_WIDGET: {
      return adapter.removeOne(action.payload.id, state);
    }

    case WidgetActionTypes.DELETE_WIDGETS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case WidgetActionTypes.A_LOAD_SUCCESS: {
      return adapter.addAll(action.payload.widgets, state);
    }

    case WidgetActionTypes.LOAD_WIDGETS: {
      return adapter.addAll(action.payload.widgets, state);
    }

    case WidgetActionTypes.CLEAR_WIDGETS: {
      return adapter.removeAll({ ...state, selectedWidgetId: '' });
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

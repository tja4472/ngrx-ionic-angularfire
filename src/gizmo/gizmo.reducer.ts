import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { GizmoActions, GizmoActionTypes } from './gizmo.actions';
import { IGizmo } from './gizmo.model';

export interface IState extends EntityState<IGizmo> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
  selectedGizmoId: string;
}

export function sortByName(a: IGizmo, b: IGizmo): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<IGizmo> = createEntityAdapter<IGizmo>({
  sortComparer: sortByName,
});

export const initialState: IState = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedGizmoId: '',
});

export function reducer(state = initialState, action: GizmoActions): IState {
  switch (action.type) {
    case GizmoActionTypes.A_LISTEN_FOR_DATA: {
      return {
        ...state,
        loading: true,
      };
    }

    case GizmoActionTypes.ADD_GIZMO: {
      return adapter.addOne(action.payload.gizmo, state);
    }

    case GizmoActionTypes.ADD_GIZMOS: {
      return adapter.addMany(action.payload.gizmos, state);
    }

    case GizmoActionTypes.UPDATE_GIZMO: {
      return adapter.updateOne(action.payload.gizmo, state);
    }

    case GizmoActionTypes.STORE_ADD_ITEMS: {
      return {
        ...adapter.addMany(action.payload.gizmos, state),
        loaded: true,
        loading: false,
      };
    }

    case GizmoActionTypes.STORE_DELETE_ITEMS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case GizmoActionTypes.STORE_UPDATE_ITEMS: {
      return adapter.updateMany(action.payload.gizmos, state);
    }

    case GizmoActionTypes.DELETE_GIZMO: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GizmoActionTypes.LOAD_GIZMOS: {
      return adapter.addAll(action.payload.gizmos, state);
    }

    case GizmoActionTypes.CLEAR_GIZMOS: {
      return adapter.removeAll({ ...state, selectedGizmoId: '' });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedGizmoId = (state: IState) => state.selectedGizmoId;

export const {
  // select the array of gizmo ids
  selectIds: selectGizmoIds,

  // select the dictionary of gizmo entities
  selectEntities: selectGizmoEntities,

  // select the array of gizmos
  selectAll: selectAllGizmos,

  // select the total gizmo count
  selectTotal: selectGizmoTotal,
} = adapter.getSelectors();

export const getLoaded = (state: IState) => state.loaded;
export const getLoading = (state: IState) => state.loading;
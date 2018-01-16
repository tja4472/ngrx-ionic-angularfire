import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { GizmoActions, GizmoActionTypes } from './gizmo.actions';
import { IGizmo } from './gizmo.model';

export interface IState extends EntityState<IGizmo> {
  // additional entities state properties
  selectedGizmoId: string;
}

export const adapter: EntityAdapter<IGizmo> = createEntityAdapter<IGizmo>();

export const initialState: IState = adapter.getInitialState({
  // additional entity state properties
  selectedGizmoId: '',
});

export function reducer(state = initialState, action: GizmoActions): IState {
  switch (action.type) {
    case GizmoActionTypes.ADD_GIZMO: {
      return adapter.addOne(action.payload.gizmo, state);
    }

    case GizmoActionTypes.ADD_GIZMOS: {
      return adapter.addMany(action.payload.gizmos, state);
    }

    case GizmoActionTypes.UPDATE_GIZMO: {
      return adapter.updateOne(action.payload.gizmo, state);
    }
    /* ngrx v5
    case GizmoActionTypes.UPDATE_GIZMO: {
      return adapter.updateOne(action.payload.gizmo, state);
    }

    case GizmoActionTypes.UPDATE_GIZMOS: {
      return adapter.updateMany(action.payload.gizmos, state);
    }
*/
    case GizmoActionTypes.DELETE_GIZMO: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GizmoActionTypes.DELETE_GIZMOS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case GizmoActionTypes.A_LOAD_SUCCESS: {
      return adapter.addAll(action.payload.gizmos, state);
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

import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  ALoadSuccess,
  AUpsertItem,
  DeleteItem,
  GizmoActionTypes,
} from './gizmo.actions';
import { GizmoDataService } from './gizmo.data.service';
import { IGizmo } from './gizmo.model';

@Injectable()
export class GizmoEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,
    private dataService: GizmoDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$
    .ofType(GizmoActionTypes.A_DELETE_ITEM)
    .map((action: DeleteItem) => action.payload)
    .do((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id);
    });

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForData$ = this.actions$
    .ofType(
      GizmoActionTypes.A_LISTEN_FOR_DATA,
      GizmoActionTypes.A_UNLISTEN_FOR_DATA,
    )
    .do(() => {
      console.log('Effect:listenForData$:A');
    })
    .switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      if (action.type === GizmoActionTypes.A_UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData$();
      }
    })
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    })
    .map((items: IGizmo[]) => new ALoadSuccess({ gizmos: items }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public upsertItem$ = this.actions$
    .ofType(GizmoActionTypes.A_UPSERT_ITEM)
    .map((action: AUpsertItem) => action.payload)
    .do((payload) => {
      console.log('Effect:upsertItem$:A', payload);
      this.dataService.upsertItem(payload.item);
    });
}

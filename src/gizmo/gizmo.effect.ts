import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  AListenForAddedItems,
  AListenForModifiedItems,
  AListenForRemovedItems,
  ALoadSuccess,
  AUpsertItem,
  DeleteGizmos,
  DeleteItem,
  GizmoActionTypes,
  UpdateGizmos,
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
  public listenForAddedItems$ = this.actions$
    .ofType(GizmoActionTypes.A_LISTEN_FOR_ADDED_ITEMS)
    .do(() => {
      console.log('Effect:listenForAddedItems$:A');
    })
    .switchMap((action) => {
      console.log('Effect:listenForAddedItems$:action>', action);
      if (action.type === GizmoActionTypes.A_UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        // return this.dataService.getData$();
        return this.dataService.ListenForAdded$();
      }
    })
    .do((x) => {
      console.log('Effect:listenForAddedItems$:B', x);
    })
    .map((items: IGizmo[]) => new ALoadSuccess({ gizmos: items }));

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForRemovedItems$ = this.actions$
    .ofType(GizmoActionTypes.A_LISTEN_FOR_REMOVED_ITEMS)
    .do(() => {
      console.log('Effect:listenForRemovedItems$:A');
    })
    .switchMap((action) => {
      console.log('Effect:listenForRemovedItems$:action>', action);
      if (action.type === GizmoActionTypes.A_UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        // return this.dataService.getData$();
        return this.dataService.ListenForRemoved$();
      }
    })
    .do((x) => {
      console.log('Effect:listenForRemovedItems$:B', x);
    })
    .map((items: IGizmo[]) => items.map((a) => a.id))
    .map((ids) => new DeleteGizmos({ ids }));

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
      return [
        new AListenForAddedItems(),
        new AListenForModifiedItems(),
        new AListenForRemovedItems(),
      ];
    });
  /*
    .switchMap((action) => {
      return this.dataService.ListenForChanges$();
    })
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    })
    .mergeMap((a) => {
      return a;
    })
    .do((x) => {
      console.log('Effect:listenForData$:C', x);
    });
    */
  /*
    .switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      return [new AListenForAddedItems(), new AListenForModifiedItems()];
    });
  */
  /*
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    })
    .map((items: IGizmo[]) => new ALoadSuccess({ gizmos: items }));
  */

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForModifiedItems$ = this.actions$
    .ofType(GizmoActionTypes.A_LISTEN_FOR_MODIFIED_ITEMS)
    .do(() => {
      console.log('Effect:listenForModifiedItems$:A');
    })
    .switchMap((action) => {
      console.log('Effect:listenForModifiedItems$:action>', action);
      if (action.type === GizmoActionTypes.A_UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        // return this.dataService.getData$();
        return this.dataService.ListenForModified$();
      }
    })
    .do((x: IGizmo[]) => {
      console.log('Effect:listenForModifiedItems$:B', x);
      const y: any = x.map((a) => {
        return {
          changes: a,
          id: a.id,
        };
      });
      console.log('XXXXXXX:B', y);
    })
    // payload: { gizmos: Array<{ id: string; changes: IGizmo }> }
    // .map((items: IGizmo[]) => new ALoadSuccess({ gizmos: items }
    .map((items: IGizmo[]) => {
      return items.map((item) => {
        return {
          changes: item,
          id: item.id,
        };
      });
    })
    .do((x) => console.log('YYYY>', x))
    .map((qq) => new UpdateGizmos({ gizmos: qq }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public upsertItem$ = this.actions$
    .ofType(GizmoActionTypes.A_UPSERT_ITEM)
    .map((action: AUpsertItem) => action.payload)
    .do((payload) => {
      console.log('Effect:upsertItem$:A', payload);
      this.dataService.upsertItem(payload.item, payload.userId);
    });
}

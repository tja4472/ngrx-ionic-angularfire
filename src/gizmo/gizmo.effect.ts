import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  DatabaseDeleteItem,
  DatabaseListenForAddedItems,
  DatabaseListenForModifiedItems,
  DatabaseListenForRemovedItems,
  DatabaseUpsertItem,
  GizmoActionTypes,
  StoreAddItems,
  StoreDeleteItems,
  StoreUpdateItems,
} from './gizmo.actions';
import { GizmoDataService } from './gizmo.data.service';
import { Gizmo } from './gizmo.model';

import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class GizmoEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.State>,
    private dataService: GizmoDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(GizmoActionTypes.DATABASE_DELETE_ITEM),
    map((action: DatabaseDeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForAddedItems$ = this.actions$.pipe(
    ofType(GizmoActionTypes.DATABASE_LISTEN_FOR_ADDED_ITEMS),
    switchMap((action) => {
      if (action.type === GizmoActionTypes.DATABASE_STOP_LISTENING_FOR_DATA) {
        return empty();
      } else {
        return this.dataService.ListenForAdded$();
      }
    }),
    map((items: Gizmo[]) => new StoreAddItems({ gizmos: items })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForRemovedItems$ = this.actions$.pipe(
    ofType(GizmoActionTypes.DATABASE_LISTEN_FOR_REMOVED_ITEMS),
    tap(() => {
      console.log('Effect:listenForRemovedItems$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForRemovedItems$:action>', action);
      if (action.type === GizmoActionTypes.DATABASE_STOP_LISTENING_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        // return this.dataService.getData$();
        return this.dataService.ListenForRemoved$();
      }
    }),
    tap((x) => {
      console.log('Effect:listenForRemovedItems$:B', x);
    }),
    map((items: Gizmo[]) => items.map((a) => a.id)),
    map((ids) => new StoreDeleteItems({ ids })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForData$ = this.actions$.pipe(
    ofType(
      GizmoActionTypes.DATABASE_START_LISTENING_FOR_DATA,
      GizmoActionTypes.DATABASE_STOP_LISTENING_FOR_DATA,
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      return [
        new DatabaseListenForAddedItems(),
        new DatabaseListenForModifiedItems(),
        new DatabaseListenForRemovedItems(),
      ];
    }),
  );
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
  public listenForModifiedItems$ = this.actions$.pipe(
    ofType(GizmoActionTypes.DATABASE_LISTEN_FOR_MODIFIED_ITEMS),
    tap(() => {
      console.log('Effect:listenForModifiedItems$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForModifiedItems$:action>', action);
      if (action.type === GizmoActionTypes.DATABASE_STOP_LISTENING_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        // return this.dataService.getData$();
        return this.dataService.ListenForModified$();
      }
    }),
    tap((x: Gizmo[]) => {
      console.log('Effect:listenForModifiedItems$:B', x);
      const y: any = x.map((a) => {
        return {
          changes: a,
          id: a.id,
        };
      });
      console.log('XXXXXXX:B', y);
    }),
    // payload: { gizmos: Array<{ id: string; changes: IGizmo }> }
    // .map((items: IGizmo[]) => new ALoadSuccess({ gizmos: items }
    map((items: Gizmo[]) => {
      return items.map((item) => {
        return {
          changes: item,
          id: item.id,
        };
      });
    }),
    tap((x) => console.log('YYYY>', x)),
    map((qq) => new StoreUpdateItems({ items: qq })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public databaseUpsertItem$ = this.actions$.pipe(
    ofType(GizmoActionTypes.DATABASE_UPSERT_ITEM),
    map((action: DatabaseUpsertItem) => action.payload),
    tap((payload) => {
      this.dataService.upsertItem(payload.item, payload.userId);
    }),
  );
}

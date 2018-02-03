import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStartError,
  DatabaseListenForDataStop,
  DeleteItem,
  GadgetActionTypes,
  LoadSuccess,
  UpsertItem,
  UpsertItemError,
  UpsertItemSuccess,
} from './gadget.actions';
import { GadgetDataService } from './gadget.data.service';
import { Gadget } from './gadget.model';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable()
export class GadgetEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<FromRootReducer.State>,
    private dataService: GadgetDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(GadgetActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id, payload.userId);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      switch (action.type) {
        case GadgetActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
          return this.dataService.getData$(action.payload.userId).pipe(
            map((items: Gadget[]) => {
              this.store$.dispatch(new LoadSuccess({ items }));
            }),
            catchError((error) => {
              this.store$.dispatch(
                new DatabaseListenForDataStartError({
                  error: this.handleFirebaseError(error),
                }),
              );
              // Pass on to higher level.
              // throw error;
              return empty();
            }),
          );
        }

        default: {
          return empty();
        }
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public upsertItem$ = this.actions$.pipe(
    ofType<UpsertItem>(GadgetActionTypes.UPSERT_ITEM),
    map((action) => action.payload),
    switchMap((payload) => {
      return fromPromise(
        this.dataService.upsertItem(payload.item, payload.userId),
      ).pipe(
        map(() => new UpsertItemSuccess()),
        catchError((error) =>
          of(
            new UpsertItemError({
              error: this.handleFirebaseError(error),
            }),
          ),
        ),
      );
    }),
  );

  private handleFirebaseError(firebaseError: any) {
    //
    return {
      code: firebaseError.code,
      message: firebaseError.message,
      name: firebaseError.name,
    };
  }
}

import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  LoadSuccess,
  UpsertItem,
  UpsertItemError,
  UpsertItemSuccess,
  WidgetActionTypes,
} from './widget.actions';
import { WidgetDataService } from './widget.data.service';
import { Widget } from './widget.model';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class WidgetEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.State>,
    private dataService: WidgetDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(WidgetActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id, payload.userId);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      switch (action.type) {
        case WidgetActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
          return this.dataService.getData$(action.payload.userId);
        }

        default: {
          return empty();
        }
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    }),
    map((items: Widget[]) => new LoadSuccess({ items })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public upsertItem$ = this.actions$.pipe(
    ofType<UpsertItem>(WidgetActionTypes.UPSERT_ITEM),
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

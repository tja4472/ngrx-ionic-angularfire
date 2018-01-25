import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import {
  DeleteItem,
  LoadSuccess,
  UpsertItem,
  WidgetActionTypes,
} from './widget.actions';
import { WidgetDataService } from './widget.data.service';
import { Widget } from './widget.model';

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
      this.dataService.deleteItem(payload.id);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public listenForData$ = this.actions$.pipe(
    ofType(
      WidgetActionTypes.START_LISTENING_FOR_DATA,
      WidgetActionTypes.STOP_LISTENING_FOR_DATA,
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      if (action.type === WidgetActionTypes.STOP_LISTENING_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData$();
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    }),
    map((items: Widget[]) => new LoadSuccess({ items })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public upsertItem$ = this.actions$.pipe(
    ofType(WidgetActionTypes.UPSERT_ITEM),
    map((action: UpsertItem) => action.payload),
    tap((payload) => {
      console.log('Effect:upsertItem$:A', payload);
      this.dataService.upsertItem(payload.item);
    }),
  );
}

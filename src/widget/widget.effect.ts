import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { empty } from 'rxjs/observable/empty';

import * as FromRootReducer from '../reducers';
import { WidgetDataService } from './widget.data.service';
import {
  DeleteItem,
  ALoadSuccess,
  WidgetActionTypes,
  AUpsertItem,
} from './widget.actions';
import { IWidget } from './widget.model';

@Injectable()
export class WidgetEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<FromRootReducer.IState>,
    private dataService: WidgetDataService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  deleteItem$ = this.actions$
    .ofType(WidgetActionTypes.A_DELETE_ITEM)
    .map((action: DeleteItem) => action.payload)
    .do((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id);
    });

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$
    .ofType(
      WidgetActionTypes.A_LISTEN_FOR_DATA,
      WidgetActionTypes.A_UNLISTEN_FOR_DATA,
    )
    .do(() => {
      console.log('Effect:listenForData$:A');
    })
    .switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      if (action.type === WidgetActionTypes.A_UNLISTEN_FOR_DATA) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return empty();
      } else {
        return this.dataService.getData$();
      }
    })
    .do((x) => {
      console.log('Effect:listenForData$:B', x);
    })
    .map((items: IWidget[]) => new ALoadSuccess({ widgets: items }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  upsertItem$ = this.actions$
    .ofType(WidgetActionTypes.A_UPSERT_ITEM)
    .map((action: AUpsertItem) => action.payload)
    .do((payload) => {
      console.log('Effect:upsertItem$:A', payload);
      this.dataService.upsertItem(payload.item);
    });
}

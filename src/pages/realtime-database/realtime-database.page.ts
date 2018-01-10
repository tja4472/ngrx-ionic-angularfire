import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-realtime-database',
  templateUrl: 'realtime-database.page.html',
})
export class RealtimeDatabasePage implements OnInit {
  public textItem$: any;
  public isFetching$: any;

  constructor(
    // private textItemEffects: TextItemEffects,
    private store: Store<fromRoot.State>
  ) {
    this.isFetching$ = store.select(fromRoot.getCollectionLoading);
    this.textItem$ = store.select(fromRoot.getCollectionTextItems);

    // this.effectsSubscription = textItemEffects.loadCollection$.subscribe(store);
  }

  ngOnInit() {}

  public viewAdd(): void {
    console.log('viewAdd');
  }

  public viewDelete(item: any): void {
    console.log('viewDelete>', item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
  }
}

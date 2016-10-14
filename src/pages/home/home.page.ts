import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IsFetchingInput, PostsInput } from '../../components/example-list/example-list.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as textItemActions from '../../actions/text-item.action'

// import { AppState } from '../../reducers';
// import { TextItemActions } from '../../actions';
import { TextItemEffects } from '../../effects/text-item.effect';
// import { CollectionSelector} from '../../selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ TextItemEffects ],
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  posts$: Observable<PostsInput>;
  isFetching$: Observable<IsFetchingInput>;

  effectsSubscription: Subscription;

  constructor(
    private textItemEffects: TextItemEffects,
    private store: Store<fromRoot.State>
  ) {
    this.isFetching$ = store.let(fromRoot.getCollectionLoading);
    this.posts$ = store.let(fromRoot.getCollectionTextItems);

    // this.effectsSubscription = textItemEffects.loadCollection$.subscribe(store);
  }

  ngOnInit() {
    this.store.dispatch(
      new textItemActions.LoadCollectionAction());
    // this.isFetching$ = Observable.of(false);
    // this.posts$ = this.af.database.list('/textItems')
    // .do(v => {console.log('posts>', v)});   
  }

  doSearch(ev) {
    //
    // set val to the value of the ev target
    console.log('doSearch');
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      //      this.items = this.items.filter((item) => {
      //        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    // this.effectsSubscription.unsubscribe();
  }

  ionViewDidUnload() {
    console.log('ionViewDidUnload');
    // this.effectsSubscription.unsubscribe();
  }
}
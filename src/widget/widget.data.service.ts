import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { Widget } from './widget.model';

const DATA_COLLECTION = 'widgets';
// const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
}

@Injectable()
export class WidgetDataService {
  private itemsCollection: AngularFirestoreCollection<FirestoreDoc>;

  private isSignedIn: boolean = true;

  constructor(public readonly afs: AngularFirestore) {
    console.log('WidgetDataService:constructor');
    this.init();
  }

  public getData$(): Observable<Widget[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.valueChanges().map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
    } else {
      return from<Widget[]>([]);
    }
  }

  public deleteItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public upsertItem(item: Widget): void {
    //
    const doc = this.toFirestoreDoc(item);
    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.itemsCollection.doc(doc.id).set(doc);
  }

  private init(): void {
    this.itemsCollection = this.afs.collection<FirestoreDoc>(
      DATA_COLLECTION,
      (ref) => ref.orderBy('name', 'asc'),
    );
  }

  private toFirestoreDoc(item: Widget): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      name: item.name,
    };

    // console.log('toFirebaseTodo>', result);
    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): Widget {
    //
    // console.log('TodoDataService:fromFirebaseTodo>', x);

    const result: Widget = { ...x };
    /*
    const result: IWidget = {
      id: x.id,
      description: x.description,
      name: x.name,
    };
*/
    // console.log('TodoDataService:fromFirebaseTodo:result>', result);

    return result;
  }
}

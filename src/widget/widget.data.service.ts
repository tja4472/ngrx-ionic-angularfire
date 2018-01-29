import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { Widget } from './widget.model';

const DATA_COLLECTION = 'widgets';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
}

@Injectable()
export class WidgetDataService {
  constructor(public readonly afs: AngularFirestore) {
    // console.log('WidgetDataService:constructor');
  }

  public getData$(userId: string): Observable<Widget[]> {
    //
    return this.firestoreCollection(userId)
      .valueChanges()
      .map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
  }

  public deleteItem(id: string, userId: string): void {
    this.firestoreCollection(userId)
      .doc(id)
      .delete();
  }

  public upsertItem(item: Widget, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    return this.firestoreCollection(userId)
      .doc(doc.id)
      .set(doc);
  }

  /*
  private init(): void {
    this.itemsCollection = this.afs.collection<FirestoreDoc>(
      DATA_COLLECTION,
      (ref) => ref.orderBy('name', 'asc'),
    );
  }
  */

  private firestoreCollection(userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('name', 'asc'),
      );

    /*
    return this.afs.collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
      ref.orderBy('name', 'asc'),
    );
    */
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

    // This copies extra fields.
    // const result: Widget = { ...x };

    const result: Widget = {
      description: x.description,
      id: x.id,
      name: x.name,
    };

    // console.log('TodoDataService:fromFirebaseTodo:result>', result);

    return result;
  }
}

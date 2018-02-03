import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Widget } from './widget.model';

const DATA_COLLECTION = 'widgets';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
  sysDateCreatedOn?: string;
  sysDateUpdatedOn?: string;
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
    if (item.id === '') {
      return this.createItem(item, userId);
    } else {
      return this.updateItem(item, userId);
    }
  }

  private createItem(item: Widget, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    doc.id = this.afs.createId();
    const recordToSet: FirestoreDoc = {
      ...doc,
      sysDateCreatedOn: dateNow,
      sysDateUpdatedOn: dateNow,
    };

    return this.firestoreCollection(userId)
      .doc(recordToSet.id)
      .set(recordToSet);
  }

  private updateItem(item: Widget, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    const recordToUpdate: FirestoreDoc = {
      ...doc,
      sysDateUpdatedOn: dateNow,
    };

    return this.firestoreCollection(userId)
      .doc(doc.id)
      .update(recordToUpdate);
  }

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

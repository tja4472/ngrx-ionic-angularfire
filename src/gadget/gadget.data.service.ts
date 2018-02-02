import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Gadget } from './gadget.model';

const DATA_COLLECTION = 'gadgets';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
  sysDateCreatedOn?: string;
  sysDateUpdatedOn?: string;
}

@Injectable()
export class GadgetDataService {
  constructor(public readonly afs: AngularFireDatabase) {
    // console.log('GadgetDataService:constructor');
  }

  public getData$(userId: string): Observable<Gadget[]> {
    //
    return this.angularFireList(userId)
      .valueChanges()
      .map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
  }

  public deleteItem(id: string, userId: string): void {
    this.angularFireList(userId).remove(id);
  }

  public upsertItem(item: Gadget, userId: string): Promise<void> {
    //
    userId = userId;
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();

    if (item.id === '') {
      return this.createItem(item, userId);
    } else {
      return this.updateItem(item, userId);
    }
  }

  private createItem(item: Gadget, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    const recordToSet: FirestoreDoc = {
      ...doc,
      sysDateCreatedOn: dateNow,
      sysDateUpdatedOn: dateNow,
    };

    return new Promise((resolve, reject) => {
      this.angularFireList(userId)
        .push(recordToSet)
        .then(
          (reference) => {
            const values: Partial<FirestoreDoc> = {
              // id: reference.key != null ? reference.key : '',
              id: reference.key!,
            };

            reference.update(values);
            resolve();
          },
          (error) => reject(error),
        );
    });
  }

  private updateItem(item: Gadget, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    const recordToUpdate: FirestoreDoc = {
      ...doc,
      sysDateUpdatedOn: dateNow,
    };

    return this.angularFireList(userId).update(doc.id, recordToUpdate);
  }

  private angularFireList(userId: string) {
    //
    const pathOrRef = USERS_COLLECTION + '/' + userId + '/' + DATA_COLLECTION;

    return this.afs.list<FirestoreDoc>(pathOrRef, (ref) =>
      ref.orderByChild('name'),
    );
    /*
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('name', 'asc'),
      );
*/
    /*
    return this.afs.collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
      ref.orderBy('name', 'asc'),
    );
    */
  }

  private toFirestoreDoc(item: Gadget): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      name: item.name,
    };

    // console.log('toFirebaseTodo>', result);
    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): Gadget {
    //
    // console.log('TodoDataService:fromFirebaseTodo>', x);

    // This copies extra fields.
    // const result: Gadget = { ...x };

    const result: Gadget = {
      description: x.description,
      id: x.id,
      name: x.name,
    };

    // console.log('TodoDataService:fromFirebaseTodo:result>', result);

    return result;
  }
}

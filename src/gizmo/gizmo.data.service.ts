import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import { Gizmo } from './gizmo.model';

const DATA_COLLECTION = 'gizmos';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
}

@Injectable()
export class GizmoDataService {
  // private itemsCollection: AngularFirestoreCollection<FirestoreDoc>;

  // private isSignedIn: boolean = true;

  constructor(public readonly afs: AngularFirestore) {
    console.log('GizmoDataService:constructor');
    // this.init();
  }

  /*
  public ListenForChanges$() {
    //
    return this.itemsCollection.stateChanges().map((actions) =>
      actions.map((a) => {
        const data = a.payload.doc.data() as FirestoreDoc;
        return {
          item: this.fromFirestoreDoc(data),
          type: a.type,
        };
      }),
    );
  }
  */
  public ListenForAdded$(userId: string): Observable<Gizmo[]> {
    //
    return this.firestoreCollection(userId)
      .stateChanges(['added'])
      .map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
  }

  public ListenForModified$(userId: string): Observable<Gizmo[]> {
    //
    return this.firestoreCollection(userId)
      .stateChanges(['modified'])
      .map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
  }

  public ListenForRemoved$(userId: string): Observable<Gizmo[]> {
    //
    return this.firestoreCollection(userId)
      .stateChanges(['removed'])
      .map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
  }

  public deleteItem(id: string, userId: string): void {
    this.firestoreCollection(userId)
      .doc(id)
      .delete();
  }

  public upsertItem(item: Gizmo, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();

    if (item.id === '') {
      // Create.
      doc.id = this.afs.createId();
      const recordToSet = {
        ...doc,
        sysDateCreatedOn: dateNow,
        sysDateUpdatedOn: dateNow,
      };
      return this.firestoreCollection(userId)
        .doc(recordToSet.id)
        .set(recordToSet);
    }

    // Update.
    const recordToUpdate = {
      ...doc,
      sysDateUpdatedOn: dateNow,
    };

    return this.firestoreCollection(userId)
      .doc(doc.id)
      .update(recordToUpdate);
  }

  private firestoreCollection(userId: string) {
    //
    /**/
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION);
    /**/
    // return this.afs.collection<FirestoreDoc>(DATA_COLLECTION);
  }

  private toFirestoreDoc(item: Gizmo): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      name: item.name,
    };

    // console.log('toFirebaseTodo>', result);
    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): Gizmo {
    //
    // console.log('TodoDataService:fromFirebaseTodo>', x);

    // This copies extra fields.
    // const result: Gizmo = { ...x };

    const result: Gizmo = {
      description: x.description,
      id: x.id,
      name: x.name,
    };

    // console.log('fromFirestoreDoc:result>', result);

    return result;
  }
}

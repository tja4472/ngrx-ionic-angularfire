import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { Gizmo } from './gizmo.model';

const DATA_COLLECTION = 'gizmos';
// const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description: string;
  name: string;
}

@Injectable()
export class GizmoDataService {
  private itemsCollection: AngularFirestoreCollection<FirestoreDoc>;

  private isSignedIn: boolean = true;

  constructor(public readonly afs: AngularFirestore) {
    console.log('GizmoDataService:constructor');
    this.init();
    /*
    this.itemsCollection.snapshotChanges().subscribe((x) => {
      console.log('snapshotChanges>', x);
    });

    this.itemsCollection.stateChanges().subscribe((x) => {
      console.log('stateChanges>', x);
    });

    this.itemsCollection.stateChanges(['added']).subscribe((x) => {
      console.log('stateChanges-added>', x);
      console.log(
        'stateChanges-added:x[0].payload.doc.data()>',
        x[0].payload.doc.data(),
      );
      const b: IFirestoreDoc = x[0].payload.doc.data() as IFirestoreDoc;
      console.log('stateChanges-added:b>', b);
    });

    this.itemsCollection.stateChanges(['modified']).subscribe((x) => {
      console.log('stateChanges-modified>', x);
    });

    this.itemsCollection.stateChanges(['removed']).subscribe((x) => {
      console.log('stateChanges-removed>', x);
    });
    */
  }

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

  public ListenForAdded$(): Observable<Gizmo[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.stateChanges(['added']).map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
    } else {
      return Observable.from<Gizmo[]>([]);
    }
  }

  public ListenForModified$(): Observable<Gizmo[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.stateChanges(['modified']).map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
    } else {
      return Observable.from<Gizmo[]>([]);
    }
  }

  public ListenForRemoved$(): Observable<Gizmo[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.stateChanges(['removed']).map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FirestoreDoc;
          return this.fromFirestoreDoc(data);
        }),
      );
    } else {
      return Observable.from<Gizmo[]>([]);
    }
  }

  public getData$(): Observable<Gizmo[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.valueChanges().map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
    } else {
      return Observable.from<Gizmo[]>([]);
    }
  }

  public deleteItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public upsertItem(item: Gizmo, userId: string): void {
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
      // (ref) => ref.orderBy('name', 'asc'),
    );
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

    const result: Gizmo = { ...x };
    /*
    const result: IGizmo = {
      id: x.id,
      description: x.description,
      name: x.name,
    };
*/
    // console.log('TodoDataService:fromFirebaseTodo:result>', result);

    return result;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import { IGizmo } from './gizmo.model';

const DATA_COLLECTION = 'gizmos';
// const USERS_COLLECTION = 'users';

interface IFirestoreDoc {
  id: string;
  description: string;
  name: string;
}

@Injectable()
export class GizmoDataService {
  private itemsCollection: AngularFirestoreCollection<IFirestoreDoc>;

  private isSignedIn: boolean = true;

  constructor(public readonly afs: AngularFirestore) {
    console.log('GizmoDataService:constructor');
    this.init();

    this.itemsCollection.snapshotChanges().subscribe((x) => {
      console.log('snapshotChanges>', x);
    });

    this.itemsCollection.stateChanges().subscribe((x) => {
      console.log('stateChanges>', x);
    });

    this.itemsCollection.stateChanges(['added']).subscribe((x) => {
      console.log('stateChanges-added>', x);
    });

    this.itemsCollection.stateChanges(['modified']).subscribe((x) => {
      console.log('stateChanges-modified>', x);
    });

    this.itemsCollection.stateChanges(['removed']).subscribe((x) => {
      console.log('stateChanges-removed>', x);
    });
  }

  public getData$(): Observable<IGizmo[]> {
    //
    if (this.isSignedIn) {
      return this.itemsCollection.valueChanges().map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        }),
      );
    } else {
      return Observable.from<IGizmo[]>([]);
    }
  }

  public deleteItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public upsertItem(item: IGizmo): void {
    //
    const doc = this.toFirestoreDoc(item);
    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.itemsCollection.doc(doc.id).set(doc);
  }

  private init(): void {
    this.itemsCollection = this.afs.collection<IFirestoreDoc>(
      DATA_COLLECTION,
      (ref) => ref.orderBy('name', 'asc'),
    );
  }

  private toFirestoreDoc(item: IGizmo): IFirestoreDoc {
    //

    const result: IFirestoreDoc = {
      id: item.id,
      description: item.description,
      name: item.name,
    };

    // console.log('toFirebaseTodo>', result);
    return result;
  }

  private fromFirestoreDoc(x: IFirestoreDoc): IGizmo {
    //
    // console.log('TodoDataService:fromFirebaseTodo>', x);

    const result: IGizmo = { ...x };
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

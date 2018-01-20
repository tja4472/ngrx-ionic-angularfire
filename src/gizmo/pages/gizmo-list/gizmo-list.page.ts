import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { IGizmo } from '../../gizmo.model';
import { GizmoService } from '../../gizmo.service';
import {
  GizmoDetailModal,
  IModalInput,
  IModalResult,
} from '../../modals/gizmo-detail/gizmo-detail.modal';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-gizmo-list',
  templateUrl: 'gizmo-list.page.html',
})
export class GizmoListPage {
  public viewData$: Observable<ReadonlyArray<IGizmo>>;
  public viewIsLoaded$: Observable<boolean>;
  public viewIsLoading$: Observable<boolean>;
  constructor(
    public modalCtrl: ModalController,
    private gizmoService: GizmoService,
  ) {
    this.viewData$ = gizmoService.getData$();
    this.viewIsLoaded$ = gizmoService.isLoaded();
    this.viewIsLoading$ = gizmoService.isLoading();
  }

  public ionViewDidLoad() {
    // this.todoService.initialise();
  }

  public viewAdd(): void {
    console.log('viewAdd');
    this.showModal();
  }

  public viewDelete(item: IGizmo): void {
    console.log('viewDelete>', item);
    this.gizmoService.deleteItem(item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
    this.showModal(item);
  }

  private showModal(item?: IGizmo) {
    //
    const modalInput: IModalInput = { item };

    const modal = this.modalCtrl.create(GizmoDetailModal, modalInput);

    modal.onDidDismiss((data: IModalResult) => {
      console.log('onDidDismiss>', data);

      if (data.save && data.item) {
        this.gizmoService.upsert(data.item);
      }
    });

    modal.present();
  }
}

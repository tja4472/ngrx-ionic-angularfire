import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Gizmo } from '../../gizmo.model';
import { GizmoService } from '../../gizmo.service';
import {
  getModalInput,
  GizmoDetailModal,
  ModalResult,
} from '../../modals/gizmo-detail/gizmo-detail.modal';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-gizmo-list',
  templateUrl: 'gizmo-list.page.html',
})
export class GizmoListPage {
  public viewData$: Observable<ReadonlyArray<Gizmo>>;
  public viewIsLoaded$: Observable<boolean>;
  public viewIsLoading$: Observable<boolean>;
  constructor(
    public modalCtrl: ModalController,
    private readonly gizmoService: GizmoService,
  ) {
    this.viewData$ = gizmoService.getData$();
    this.viewIsLoaded$ = gizmoService.isLoaded();
    this.viewIsLoading$ = gizmoService.isLoading();
  }

  public ionViewDidLoad() {
    //
    this.gizmoService.ListenForDataStart();
  }

  public ionViewWillUnload() {
    //
    this.gizmoService.ListenForDataStop();
  }

  public viewAdd(): void {
    console.log('viewAdd');
    this.showModal();
  }

  public viewDelete(item: Gizmo): void {
    console.log('viewDelete>', item);
    this.gizmoService.deleteItem(item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
    this.showModal(item);
  }

  private showModal(item?: Gizmo) {
    //
    const modalInput = getModalInput(item);

    const modal = this.modalCtrl.create(GizmoDetailModal, modalInput);

    modal.onDidDismiss((data: ModalResult) => {
      console.log('onDidDismiss>', data);

      if (data.save && data.item) {
        this.gizmoService.upsert(data.item);
      }
    });

    modal.present();
  }
}

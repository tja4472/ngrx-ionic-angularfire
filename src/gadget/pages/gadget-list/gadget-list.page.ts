import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Gadget } from '../../gadget.model';
import { GadgetService } from '../../gadget.service';
import {
  GadgetDetailModal,
  getModalInput,
  ModalResult,
} from '../../modals/gadget-detail/gadget-detail.modal';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-gadget-list',
  templateUrl: 'gadget-list.page.html',
})
export class GadgetListPage {
  public viewData$: Observable<ReadonlyArray<Gadget>>;
  public viewIsLoaded$: Observable<boolean>;
  public viewIsLoading$: Observable<boolean>;

  constructor(
    public modalCtrl: ModalController,
    private readonly gadgetService: GadgetService,
  ) {
    this.viewData$ = gadgetService.getData$();
    this.viewIsLoaded$ = gadgetService.isLoaded();
    this.viewIsLoading$ = gadgetService.isLoading();
  }

  public ionViewDidLoad() {
    //
    this.gadgetService.ListenForDataStart();
  }

  public ionViewWillUnload() {
    //
    this.gadgetService.ListenForDataStop();
  }

  public viewAdd(): void {
    console.log('viewAdd');
    this.showModal();
  }

  public viewDelete(item: Gadget): void {
    console.log('viewDelete>', item);
    this.gadgetService.deleteItem(item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
    this.showModal(item);
  }

  private showModal(item?: Gadget) {
    //
    const modalInput = getModalInput(item);

    const modal = this.modalCtrl.create(GadgetDetailModal, modalInput);

    modal.onDidDismiss((data: ModalResult | null) => {
      console.log('onDidDismiss>', data);

      if (data === null) {
        console.log('onDidDismiss:NULL');
        return;
      }

      if (data.save && data.item) {
        this.gadgetService.upsertItem(data.item);
      }
    });

    modal.present();
  }
}

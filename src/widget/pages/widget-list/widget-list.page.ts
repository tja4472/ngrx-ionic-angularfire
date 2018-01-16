import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import {
  IModalInput,
  IModalResult,
  WidgetDetailModal,
} from '../../modals/widget-detail/widget-detail.modal';
import { IWidget } from '../../widget.model';
import { WidgetService } from '../../widget.service';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-widget-list',
  templateUrl: 'widget-list.page.html',
})
export class WidgetListPage {
  public viewData$: Observable<IWidget[]>;

  constructor(
    public modalCtrl: ModalController,
    private widgetService: WidgetService,
  ) {
    this.viewData$ = widgetService.getData$();
  }

  public ionViewDidLoad() {
    // this.todoService.initialise();
  }

  public viewAdd(): void {
    console.log('viewAdd');
    this.showModal();
  }

  public viewDelete(item: IWidget): void {
    console.log('viewDelete>', item);
    this.widgetService.deleteItem(item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
    this.showModal(item);
  }

  private showModal(item?: IWidget) {
    //
    const modalInput: IModalInput = { item };

    const modal = this.modalCtrl.create(WidgetDetailModal, modalInput);

    modal.onDidDismiss((data: IModalResult) => {
      console.log('onDidDismiss>', data);

      if (data.save && data.item) {
        this.widgetService.upsert(data.item);
      }
    });

    modal.present();
  }
}

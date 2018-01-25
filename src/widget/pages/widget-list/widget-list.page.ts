import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import {
  ModalInput,
  ModalResult,
  WidgetDetailModal,
} from '../../modals/widget-detail/widget-detail.modal';
import { Widget } from '../../widget.model';
import { WidgetService } from '../../widget.service';

// import { Store } from '@ngrx/store';

// import * as fromRoot from '../../reducers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-page-widget-list',
  templateUrl: 'widget-list.page.html',
})
export class WidgetListPage {
  public viewData$: Observable<Widget[]>;
  public viewIsLoaded$: Observable<boolean>;
  public viewIsLoading$: Observable<boolean>;

  constructor(
    public modalCtrl: ModalController,
    private widgetService: WidgetService,
  ) {
    this.viewData$ = widgetService.getData$();
    this.viewIsLoaded$ = widgetService.isLoaded();
    this.viewIsLoading$ = widgetService.isLoading();
  }

  public ionViewDidLoad() {
    // this.todoService.initialise();
  }

  public viewAdd(): void {
    console.log('viewAdd');
    this.showModal();
  }

  public viewDelete(item: Widget): void {
    console.log('viewDelete>', item);
    this.widgetService.deleteItem(item);
  }

  public viewEdit(item: any): void {
    console.log('viewEdit>', item);
    this.showModal(item);
  }

  private showModal(item?: Widget) {
    //
    const modalInput: ModalInput = { item };

    const modal = this.modalCtrl.create(WidgetDetailModal, modalInput);

    modal.onDidDismiss((data: ModalResult) => {
      console.log('onDidDismiss>', data);

      if (data.save && data.item) {
        this.widgetService.upsertItem(data.item);
      }
    });

    modal.present();
  }
}

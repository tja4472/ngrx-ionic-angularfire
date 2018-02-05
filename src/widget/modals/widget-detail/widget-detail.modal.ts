import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

import { NewWidget, Widget } from '../../widget.model';

export interface ModalInput {
  item?: Widget;
}

export interface ModalResult {
  save: boolean;
  item?: Widget;
}

interface FormModel {
  description: any;
  name: any;
}

@Component({
  selector: 'tja-modal-widget-detail',
  templateUrl: 'widget-detail.modal.html',
})
export class WidgetDetailModal {
  // Called from view.
  // public viewForm: any;
  public viewForm: FormGroup;

  public get viewCanSave(): boolean {
    return !(this.viewForm.dirty && this.viewForm.valid);
  }

  private readonly CLASS_NAME = 'WidgetDetailModal';

  private dataModel: Widget;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    console.log('navParams>', navParams);
    console.log('navParams.data>', navParams.data);
    console.log('navParams.get("item")>', navParams.get('item'));

    const paramItem: Widget = navParams.get('item');

    if (paramItem === undefined) {
      // new item.
      this.dataModel = NewWidget();
    } else {
      // navParams passes by reference.
      this.dataModel = { ...paramItem };
    }

    console.log('}}}}}}paramItem>', paramItem);
    console.log('}}}}}}this.dataModel>', this.dataModel);
  }

  public ngOnInit() {
    console.log('###%s:ngOnInit>', this.CLASS_NAME);

    this.viewForm = this.formBuilder.group({
      description: [this.dataModel.description],
      name: [this.dataModel.name, Validators.required],
    } as FormModel);

    /*
    this.viewForm.setValue({
      description: this.dataModel.description,
      name: this.dataModel.name,
    } as FormModel);
    */
  }

  public viewCancel() {
    console.log('viewCancel>');
    const result: ModalResult = { save: false };

    this.viewController.dismiss(result);
  }

  public viewSave() {
    console.log('viewSave>');

    if (!this.viewForm.valid) {
      return;
    }

    console.log('this.todoForm.value>', this.viewForm.value);

    const saveItem = this.prepareSaveItem();
    console.log('saveItem>', saveItem);
    const result: ModalResult = { save: true, item: saveItem };
    this.viewController.dismiss(result);
  }

  private prepareSaveItem(): Widget {
    const formModel: FormModel = this.viewForm.value;

    const saveItem: Widget = {
      ...this.dataModel,
      description: formModel.description,
      name: formModel.name,
    };

    return saveItem;
  }
}

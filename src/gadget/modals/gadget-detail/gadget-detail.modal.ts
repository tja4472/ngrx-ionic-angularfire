import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

import { Gadget } from '../../gadget.model';

export interface ModalInput {
  item?: Gadget;
}

export interface ModalResult {
  save: boolean;
  item?: Gadget;
}

@Component({
  selector: 'tja-modal-gadget-detail',
  templateUrl: 'gadget-detail.modal.html',
})
export class GadgetDetailModal {
  // Called from view.
  public viewForm: any;

  public get viewCanSave(): boolean {
    return !(this.viewForm.dirty && this.viewForm.valid);
  }

  private readonly CLASS_NAME = 'GadgetDetailModal';

  private formItem: Gadget;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    console.log('navParams>', navParams);
    console.log('navParams.data>', navParams.data);
    console.log('navParams.get("item")>', navParams.get('item'));

    const paramItem: Gadget = navParams.get('item');

    if (paramItem === undefined) {
      // new item.
      this.formItem = { id: '', description: '', name: '' };
    } else {
      // navParams passes by reference.
      this.formItem = Object.assign({}, navParams.get('item'));
    }

    // navParams passes by reference.
    const navParamsTodo: Readonly<Gadget> = Object.assign(
      {},
      navParams.get('item'),
    );
    // a.description = 'GGGGGGGGGGGG';
    console.log('navParamsTodo>', navParamsTodo);
  }

  public ngOnInit() {
    console.log('###%s:ngOnInit>', this.CLASS_NAME);
    // console.log('this.todo.isNew()>', this.todo.isNew());
    /*
            if (this.todo.$key === undefined) {
                this.isEditing = false;
            }
    */
    this.viewForm = this.formBuilder.group({
      description: [this.formItem.description],
      name: [this.formItem.name, Validators.required],
    });
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
    console.log('this.formItem>', this.formItem);

    const editedItem: Gadget = { ...this.formItem, ...this.viewForm.value };
    const result: ModalResult = { save: true, item: editedItem };
    this.viewController.dismiss(result);
  }
}

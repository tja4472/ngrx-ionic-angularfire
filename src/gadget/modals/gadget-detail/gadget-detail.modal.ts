import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

import { Gadget, newGadget } from '../../gadget.model';

export interface ModalInput {
  item?: Gadget;
}

export function getModalInput(item: Gadget | undefined) {
  //
  const modalInput: ModalInput = { item };

  return {
    modalInput,
  };
}

export interface ModalResult {
  save: boolean;
  item?: Gadget;
}

interface FormModel {
  description: any;
  name: any;
}

@Component({
  selector: 'tja-modal-gadget-detail',
  templateUrl: 'gadget-detail.modal.html',
})
export class GadgetDetailModal {
  // Called from view.
  public viewForm: FormGroup;

  public get viewCanSave(): boolean {
    return !(this.viewForm.dirty && this.viewForm.valid);
  }

  private readonly CLASS_NAME = 'GadgetDetailModal';

  private dataModel: Gadget;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    const modalInput: ModalInput = this.getModalInput();

    if (modalInput.item === undefined) {
      // new item.
      this.dataModel = newGadget();
    } else {
      // navParams passes by reference.
      this.dataModel = { ...modalInput.item };
    }
  }

  public ngOnInit() {
    console.log('###%s:ngOnInit>', this.CLASS_NAME);

    this.viewForm = this.formBuilder.group({
      description: [this.dataModel.description],
      name: [this.dataModel.name, Validators.required],
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

    const saveItem = this.prepareSaveItem();
    const result: ModalResult = { save: true, item: saveItem };
    this.viewController.dismiss(result);
  }

  private getModalInput(): ModalInput {
    //
    return this.navParams.get('modalInput');
  }

  private prepareSaveItem(): Gadget {
    const formModel: FormModel = this.viewForm.value;

    const saveItem: Gadget = {
      ...this.dataModel,
      description: formModel.description,
      name: formModel.name,
    };

    return saveItem;
  }
}

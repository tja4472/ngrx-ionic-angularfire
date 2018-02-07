import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

import { Gizmo, newGizmo } from '../../gizmo.model';

interface ModalInput {
  item?: Gizmo;
}

export function getModalInput(item: Gizmo | undefined) {
  //
  const modalInput: ModalInput = { item };

  return {
    modalInput,
  };
}

export interface ModalResult {
  save: boolean;
  item?: Gizmo;
}

interface FormModel {
  description: any;
  name: any;
}

@Component({
  selector: 'tja-modal-gizmo-detail',
  templateUrl: 'gizmo-detail.modal.html',
})
export class GizmoDetailModal {
  // Called from view.
  public viewForm: FormGroup;

  public get viewCanSave(): boolean {
    return !(this.viewForm.dirty && this.viewForm.valid);
  }

  private readonly CLASS_NAME = 'GizmoDetailModal';

  private dataModel: Gizmo;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    const modalInput: ModalInput = this.getModalInput();

    if (modalInput.item === undefined) {
      // new item.
      this.dataModel = newGizmo();
    } else {
      // navParams passes by reference.
      this.dataModel = { ...modalInput.item };
    }
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

  private prepareSaveItem(): Gizmo {
    const formModel: FormModel = this.viewForm.value;

    const saveItem: Gizmo = {
      ...this.dataModel,
      description: formModel.description,
      name: formModel.name,
    };

    return saveItem;
  }
}

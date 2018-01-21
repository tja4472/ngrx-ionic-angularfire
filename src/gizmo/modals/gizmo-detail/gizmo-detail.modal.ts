import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

import { Gizmo } from '../../gizmo.model';

export interface ModalInput {
  item?: Gizmo;
}

export interface ModalResult {
  save: boolean;
  item?: Gizmo;
}

@Component({
  selector: 'tja-modal-gizmo-detail',
  templateUrl: 'gizmo-detail.modal.html',
})
export class GizmoDetailModal {
  // Called from view.
  public viewForm: any;

  public get viewCanSave(): boolean {
    return !(this.viewForm.dirty && this.viewForm.valid);
  }

  private readonly CLASS_NAME = 'GizmoDetailModal';

  private formItem: Gizmo;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    console.log('navParams>', navParams);
    console.log('navParams.data>', navParams.data);
    console.log('navParams.get("item")>', navParams.get('item'));

    const paramItem: Gizmo = navParams.get('item');

    if (paramItem === undefined) {
      // new item.
      this.formItem = { id: '', description: '', name: '' };
    } else {
      // navParams passes by reference.
      this.formItem = Object.assign({}, navParams.get('item'));
    }

    // navParams passes by reference.
    const navParamsTodo: Readonly<Gizmo> = Object.assign(
      {},
      navParams.get('item'),
    );
    // a.description = 'GGGGGGGGGGGG';
    console.log('navParamsTodo>', navParamsTodo);

    /*
    const navParamsTodo: Readonly<IGizmo> = Object.assign(new TodoListsItem(), navParams.get('todo'));
    console.log('navParamsTodo>', navParamsTodo);
    console.log('navParamsTodo.isNew()>', navParamsTodo.isNew());

    this.viewItem = Object.assign(new TodoListsItem(), navParamsTodo);
    console.log('this.todo>', this.viewItem);
*/
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

    const editedItem: Gizmo = { ...this.formItem, ...this.viewForm.value };
    const result: ModalResult = { save: true, item: editedItem };
    this.viewController.dismiss(result);
  }
}

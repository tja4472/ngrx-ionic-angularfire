import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { IWidget } from '../../widget.model';

export interface IModalInput {
  item?: IWidget;
}

export interface IModalResult {
  save: boolean;
  item?: IWidget;
}

@Component({
  selector: 'tja-modal-widget-detail',
  templateUrl: 'widget-detail.modal.html',
})
export class WidgetDetailModal {
  // Called from view.
  public viewForm: any;

  public get viewCanSave(): boolean {
    return !this.viewForm.valid;
  }

  private readonly CLASS_NAME = 'WidgetDetailModal';

  private formItem: IWidget;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    console.log(`%s:constructor`, this.CLASS_NAME);

    console.log('navParams>', navParams);
    console.log('navParams.data>', navParams.data);
    console.log('navParams.get("item")>', navParams.get('item'));

    const paramItem: IWidget = navParams.get('item');

    if (paramItem === undefined) {
      // new item.
      this.formItem = { id: '', description: '', name: '' };
    } else {
      // navParams passes by reference.
      this.formItem = Object.assign({}, navParams.get('item'));
    }

    // navParams passes by reference.
    const navParamsTodo: Readonly<IWidget> = Object.assign(
      {},
      navParams.get('item'),
    );
    // a.description = 'GGGGGGGGGGGG';
    console.log('navParamsTodo>', navParamsTodo);

    /*
    const navParamsTodo: Readonly<IWidget> = Object.assign(new TodoListsItem(), navParams.get('todo'));
    console.log('navParamsTodo>', navParamsTodo);
    console.log('navParamsTodo.isNew()>', navParamsTodo.isNew());

    this.viewItem = Object.assign(new TodoListsItem(), navParamsTodo);
    console.log('this.todo>', this.viewItem);
*/
  }

  ngOnInit() {
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
    const result: IModalResult = { save: false };

    this.viewController.dismiss(result);
  }

  public viewSave() {
    console.log('viewSave>');

    if (!this.viewForm.valid) {
      return;
    }

    console.log('this.todoForm.value>', this.viewForm.value);
    console.log('this.formItem>', this.formItem);

    const editedItem: IWidget = { ...this.formItem, ...this.viewForm.value };
    const result: IModalResult = { save: true, item: editedItem };
    this.viewController.dismiss(result);
  }
}

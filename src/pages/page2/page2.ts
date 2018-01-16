import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

export interface ItemInterface {
  title: string;
  note: string;
  icon: string;
}

@Component({
  templateUrl: 'page2.html',
})
export class Page2 {
  public selectedItem: any;
  public icons: string[];
  public items: Array<{ title: string; note: string; icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = [
      'flask',
      'wifi',
      'beer',
      'football',
      'basketball',
      'paper-plane',
      'american-football',
      'boat',
      'bluetooth',
      'build',
    ];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        note: 'This is item #' + i,
        title: 'Item ' + i,
      });
    }
  }

  public itemTapped(event: Event, item: ItemInterface) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item,
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;

  selected:any

  constructor() { }

  ngOnInit() {
  }

  setSelectedTab(){
    // console.log('called');
    this.selected = this.tabs.getSelected();
  }

}

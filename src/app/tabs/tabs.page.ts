import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

    scrollToTop() {
      const content = document.querySelector('ion-content');
      if (content) {
        content.scrollToTop(300);
      }
    }

}

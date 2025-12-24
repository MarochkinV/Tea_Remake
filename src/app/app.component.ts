import {Component, OnInit} from '@angular/core';

declare var WOW: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit(): void {
    setTimeout((): void => {
      if (typeof WOW !== 'undefined') {
        new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: false,
          scrollContainer: null,
          resetAnimation: true
        }).init();
      }
    }, 1000);
  }
}

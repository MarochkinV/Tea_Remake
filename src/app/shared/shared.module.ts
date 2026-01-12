import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from "./components/accordion/accordion.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {PopupComponent} from "./components/popup/popup.component";
import {SliderComponent} from "./components/slider/slider.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [
    AccordionComponent,
    FooterComponent,
    HeaderComponent,
    PopupComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterLinkWithHref,
  ],
  exports: [
    AccordionComponent,
    FooterComponent,
    HeaderComponent,
    PopupComponent,
    SliderComponent
  ]
})
export class SharedModule {
}

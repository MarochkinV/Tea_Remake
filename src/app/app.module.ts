import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgwWowModule} from "ngx-wow";
import {SliderComponent} from './components/common/slider/slider.component';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {PopupComponent} from './components/common/popup/popup.component';
import {MainComponent} from './components/pages/main/main.component';
import {CatalogComponent} from './components/pages/catalog/catalog.component';
import {OrderComponent} from './components/pages/order/order.component';
import {ProductComponent} from './components/pages/product/product.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { AccordionComponent } from './components/common/accordion/accordion.component';


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    MainComponent,
    CatalogComponent,
    OrderComponent,
    ProductComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgwWowModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

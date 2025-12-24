import {Component, OnInit} from '@angular/core';
import {ProductCard} from "../../../types/product.card";
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  public products: ProductCard[] = [];

  constructor(private http: HttpClient, private productsService: ProductsService) {
  }

  public ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService.getProducts()
      .subscribe({
        next: (data): void => {
          this.products = data;
        },
      });
  }
}

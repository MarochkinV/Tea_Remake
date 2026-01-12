import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../shared/services/products.service';
import {ProductCard} from '../../../../types/product.card';
import {finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: ProductCard | null = null;
  public isLoading: boolean = true;
  public error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  private loadProduct(id: string): void {
    this.isLoading = true;
    this.error = null;
    this.product = null;

    const productId: number = Number(id);

    this.productsService.getProductById(productId)
      .pipe(
        tap((): void => {
        }),
        finalize((): void => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data: ProductCard | null): void => {
          if (data) {
            this.product = data;
          }
        }
      });
  }
}

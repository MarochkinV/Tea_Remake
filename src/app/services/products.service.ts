import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCard} from '../types/product.card';
import {OrderData} from "../types/order.data";

export interface OrderResponse {
  success: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl = 'https://testologia.ru';

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<ProductCard[]> {
    return this.http.get<ProductCard[]>(`${this.apiUrl}/tea`);
  }

  public getProductById(id: number): Observable<ProductCard> {
    return this.http.get<ProductCard>(`${this.apiUrl}/tea?id=${id}`);
  }

  public createOrder(orderData: OrderData): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/order-tea`, orderData);
  }
}

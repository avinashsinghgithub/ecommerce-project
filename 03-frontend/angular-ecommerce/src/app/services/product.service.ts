import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";
  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{


    // need to build URL based on the category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCatgory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  
}
interface GetResponseProduct {

  _embedded: {
    products : Product[]; 
  }
}

interface GetResponseProductCatgory {

  _embedded: {
    productCategory : ProductCategory[]; 
  }
}
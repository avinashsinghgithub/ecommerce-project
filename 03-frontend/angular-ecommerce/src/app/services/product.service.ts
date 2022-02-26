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

  getProduct(theProductId: number):Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${theProductId}`);
  }
  getProductList(theCategoryId:number): Observable<Product[]>{


    // need to build URL based on the category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage:number, thePageSize:number, theCategoryId:number): Observable<GetResponseProduct>{

    // need to build URL based on the category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCatgory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string) {
    // need to build URL based on the keyword

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  
  searchProductsPaginate(thePage:number, thePageSize:number, theKeyword: string):Observable<GetResponseProduct> {
    // need to build URL based on the keyword, page and size

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponseProduct {

  _embedded: {
    products : Product[]; 
  },
  page: {
    size : number,
    totalElements: number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCatgory {

  _embedded: {
    productCategory : ProductCategory[]; 
  }
}
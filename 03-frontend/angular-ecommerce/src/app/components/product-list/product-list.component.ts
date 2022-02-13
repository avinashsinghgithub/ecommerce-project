import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
 // templateUrl: './product-list.component.html',
 templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currrentCategoryId:number;
  constructor(private productService:ProductService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
   
  }
  listProducts(){
    // check if "id" parameter is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      // get the "id" param string, convert string to a number using "+" symbol
      this.currrentCategoryId = +this.route.snapshot.paramMap.get("id");
    }else{
      this.currrentCategoryId = 1;
    }
    this.productService.getProductList(this.currrentCategoryId).subscribe(

      data =>{
        this.products = data;
      }
    )

  }
}

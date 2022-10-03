import { Component, OnInit } from '@angular/core';
import { category } from '../../models/category';
import { product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { productsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
products: product[]=[];
categories: category[]=[];
  constructor(private productService:productsService, private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }
private _getProducts(){
  this.productService.getProducts().subscribe(resProducts=>{
    this.products = resProducts;
  })
}
private _getCategories(){
  this.categoryService.getCategories().subscribe(rescat=>{
    this.categories = rescat;
  })
}
}

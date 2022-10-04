import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { category } from '../../models/category';
import { product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { productsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products: product[] = [];
  categories: category[] = [];
  isCategoryPage!: boolean;
  constructor(
    private productService: productsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid']
        ? this._getProducts([params['categoryid']])
        : this._getProducts();
      params['categoryid']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this._getCategories();
  }
  private _getProducts(_categoryFilter?: any) {
    this.productService
      .getProducts(_categoryFilter)
      .subscribe((resProducts) => {
        this.products = resProducts;
      });
  }
  private _getCategories() {
    this.categoryService.getCategories().subscribe((rescat) => {
      
      this.categories = rescat;
    });
  }
  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
      
    this._getProducts(selectedCategories);
  }
}

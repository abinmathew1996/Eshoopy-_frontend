import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
@Input() product:any
  constructor() { }

  ngOnInit(): void {
  }

}

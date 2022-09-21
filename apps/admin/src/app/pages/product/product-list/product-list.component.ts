import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product, productsService } from '@aphrodite/products';

@Component({
  selector: 'bluebits-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products:any;

  constructor(private productservice :productsService,
    private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
  }
  private getProducts(){
    this.productservice.getProducts().subscribe(prod =>{
this.products = prod;
console.log(prod);

    })
  }
  updateProduct(productid:any){
    this.router.navigateByUrl(`products/form/${productid}`);


  }
  deleteProduct(productId: string) {
    // this.confirmationService.confirm({
    //   message: 'Do you want to delete this Product?',
    //   header: 'Delete Product',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.productsService.deleteProduct(productId).subscribe(
    //       () => {
    //         this._getProducts();
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'Success',
    //           detail: 'Product is deleted!'
    //         });
    //       },
    //       () => {
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error',
    //           detail: 'Product is not deleted!'
    //         });
    //       }
    //     );
    //   }
    // });
  }

}

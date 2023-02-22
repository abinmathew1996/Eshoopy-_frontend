import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@aphrodite/users';
import { take } from 'rxjs';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { ordersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  UserId: any;
  countries: any = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService: CartService,
    private orderService: ordersService
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    // this.autoFillUserData();
    this._getCountries();
    this.getCartItem();
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  // private autoFillUserData() {
  //   this.usersService
  //     .observeCurrentUser()
  //     .pipe(take(1))
  //     .subscribe((user) => {
  //       if (user) {
  //         this.checkoutForm['name'].setValue(user.name);
  //         this.checkoutForm['email'].setValue(user.email);
  //         this.checkoutForm['phone'].setValue(user.phone);
  //         this.checkoutForm['city'].setValue(user.city);
  //         this.checkoutForm['country'].setValue(user.country);
  //         this.checkoutForm['zip'].setValue(user.zip);
  //         this.checkoutForm['apartment'].setValue(user.apartment);
  //         this.checkoutForm['street'].setValue(user.street);
  //       }
  //     });
  // }

  private getCartItem() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
    console.log(this.orderItems);
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['apartment'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      users: this.UserId,
      dateOrdered: `${Date.now()}`,
    };
    this.orderService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page //payment page

        this.router.navigate(['/success']);
        this.cartService.emptyCart();
      },
      () => {
        console.log('unable to place the order');
      }
    );
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }
}

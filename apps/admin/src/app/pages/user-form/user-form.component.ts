import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { user } from 'libs/users/src/lib/models/user';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil } from 'rxjs';

declare const require: (arg0: string) => countriesLib.LocaleData;
@Component({
  selector: 'bluebits-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit,OnDestroy {
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId:any;
  countries: any = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this.checkEditingMode();
  }
  ngOnDestroy() {
    console.log('category distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }


  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private addUser(user:any) {
    this.usersService.createUser(user).pipe(takeUntil(this.endsubs$)).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `user ${user.name} is created`,
        });
        // this.router.navigateByUrl('users');
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error ',
          detail: 'user Not created',
        });
      },
    });
  }

  private updateUser(user: user) {
    this.usersService.updateUser(user).pipe(takeUntil(this.endsubs$)).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'user is created',
        });
        // this.router.navigateByUrl('users');
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error ',
          detail: 'user Not created',
        });
      },
    });
  }
  private checkEditingMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      // console.log(params);
      // console.log(params['id']);

      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: user = {
      id: this['currentUserId'],
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };

    if (this.editmode) {
      this.updateUser(user);
      console.log(user);
    } else {
      this.addUser(user);
      console.log(user);
    }
  }
  onCancle() {}

  get userForm() {
    return this.form.controls;
  }
}

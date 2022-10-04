import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSumitted = false;
  authError = false;
  authMessage = 'email or password are wrong ';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorage: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }
  private initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSumitted = true;
    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
       {
        next: (user) => {
          this.authError = false;
          this.localStorage.setToken(user.token);
          this.router.navigate(['/']);
        },
       error: (error) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the server, Plase try again later';
          }
        }
       }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}

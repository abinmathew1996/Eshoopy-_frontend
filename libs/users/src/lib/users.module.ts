import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import * as fromUsers from './state/users.reducer';

// import { UsersEffects } from './state/users.effects';
// import { UsersFacade } from './state/users.facade';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    // EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from '../../../../libs/ui/src/lib/ui.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsModule } from '@aphrodite/products';
import { OrdersModule } from '@aphrodite/orders';
import { JwtInterceptor, UsersModule } from '@aphrodite/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
    ProductsModule,
    OrdersModule,
    UsersModule
  ],
  providers: [MessageService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from '../../../../libs/ui/src/lib/ui.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from 'libs/products/src/lib/products.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Product', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    BrowserAnimationsModule,
    ProductsModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

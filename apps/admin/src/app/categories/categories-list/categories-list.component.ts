import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, category } from '@aphrodite/products';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: category[] = [];

  constructor(
    private categoryservice: CategoriesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(categoryId: string) {
    this.categoryservice.deleteCategories(categoryId).subscribe({
      next: (res) => {
        this.getCategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is deleted',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'erroe ',
          detail: 'category Not delete this category',
        });
      },
    });
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private getCategories() {
    this.categoryservice.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
}

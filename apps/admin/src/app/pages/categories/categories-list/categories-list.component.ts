import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, category } from '@aphrodite/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'bluebits-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: category[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private categoryservice: CategoriesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy() {
    console.log('category distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.categoryservice
      .deleteCategories(categoryId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
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

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private getCategories() {
    this.categoryservice
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categories = cats;
      });
  }
}

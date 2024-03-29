import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '@aphrodite/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'bluebits-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit , OnDestroy {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color:['#fff']
  });

  isSumitted = false;
  editMode = false;
  currentCategoryID!: string;
  endsubs$: Subject<any> = new Subject();


  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryservice: CategoriesService,
    private router: Router,
    private activevatedrouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkEditingMode();
  }
  ngOnDestroy() {
    console.log('category distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSumitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: any = {
      id: this.currentCategoryID,
      name: this.form.controls.name.value,
      icon: this.form.controls.icon.value,
      color:this.form.controls.color.value
    };

    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
    console.log(category);
  }

  private addCategory(category: any) {
    this.categoryservice.createCategories(category).pipe(takeUntil(this.endsubs$)).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${res.name} is created`,
        });
        this.router.navigateByUrl('categories');
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error ',
          detail: 'category Not created',
        });
      },
    });
  }

  private updateCategory(category: any) {
    this.categoryservice.updateCategories(category).pipe(takeUntil(this.endsubs$)).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail:'Category is created' ,
        });
        this.router.navigateByUrl('categories');
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error ',
          detail: 'category Not created',
        });
      },
    });
  }
  private checkEditingMode() {
    this.activevatedrouter.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      // console.log(params);
      // console.log(params['id']);

      if (params['id']) {
        this.editMode = true;
        this.currentCategoryID = params['id'];
        this.categoryservice.getCategory(params['id']).pipe(takeUntil(this.endsubs$)).subscribe((category) => {
          // console.log(category);

          this.form.controls.name.setValue(category.name);
          this.form.controls.icon.setValue(category.icon);
          this.form.controls.color.setValue(category.color);

          //  console.log(category);
        });
      }
    });
  }
}

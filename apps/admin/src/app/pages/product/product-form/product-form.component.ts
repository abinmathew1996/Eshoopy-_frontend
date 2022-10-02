import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, productsService } from '@aphrodite/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  catagories: any = [];
  imageDisplay!: any | ArrayBuffer;
  currentProductId!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private productsService: productsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._checkEditMode();
    this.initForm();
  }
  ngOnDestroy() {
    console.log('category distroyed');
    this.endsubs$.next('');
    this.endsubs$.complete();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.catagories = categories;
      });
  }

  private _addProduct(productData: FormData) {
    this.productsService
      .createProduct(productData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!',
          });
        },
      });
  }

  private(productFormData: FormData) {
    this.productsService
      .updateProduct(productFormData, this.currentProductId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (): void => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        },
      });
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
      // console.log(key);
      // console.log(this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  private _updateProduct(productFormData: FormData) {
    throw new Error('Method not implemented.');
  }
  onCancle() {}

  onImageUpload(event: any) {
    // console.log(event);

    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
}

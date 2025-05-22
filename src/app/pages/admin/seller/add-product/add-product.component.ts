import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellersService } from 'src/app/services/seller/sellers/sellers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isLoading = false;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  categories = [
    { id: 'fresh-fish', name: 'Fresh Fish' },
    { id: 'frozen-fish', name: 'Frozen Fish' },
    { id: 'shellfish', name: 'Shellfish' },
    { id: 'seafood', name: 'Seafood' }
  ];

  storageTypes = [
    { id: 'frozen', name: 'Frozen' },
    { id: 'fresh', name: 'Fresh' },
    { id: 'chilled', name: 'Chilled' }
  ];

  constructor(
    private fb: FormBuilder,
    private sellersService: SellersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    const user = localStorage.getItem('sellerInfo');
    if (!user) {
      this.router.navigate(['/auth/login']);
    }
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(500)]],
      categoryId: ['', Validators.required],
      storageType: ['', Validators.required],
      alertQuantity: ['', [Validators.min(0)]]
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (!control) return '';

    if (control.errors?.['required']) {
      return 'This field is required';
    }
    if (control.errors?.['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors?.['min']) {
      return `Minimum value is ${control.errors['min'].min}`;
    }
    if (control.errors?.['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    return '';
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFiles = Array.from(target.files);
      this.previewUrls = [];

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  submit(): void {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.selectedFiles.forEach(file => {
      formData.append('images', file); // use 'images[]' if backend expects an array
    });

    this.isLoading = true;
    this.sellersService.createProduct(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Product added successfully!');
        this.router.navigate(['/admin/seller/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Failed to add product');
      }
    });
  }
}

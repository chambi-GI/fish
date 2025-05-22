import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../services/products/products.service';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Product, CreateProductDto, UpdateProductDto, ProductFilters } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  productForm!: FormGroup;
  loading = false;
  isEditing = false;
  selectedProductId: string | null = null;
  dragOverIndex: number | null = null;
  imageErrors: string[] = ['', '', '', '', ''];
  imageProgress: number[] = [0, 0, 0, 0, 0];
  filters: ProductFilters = {};
  showFilters = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.initProductForm();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.products = this.products.map(product => ({
      ...product,
      images: product.images.map(img => typeof img === 'string' ? { url: img } : img)
    }));
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      images: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ]),
      isActive: [true],
      sku: [''],
      weight: [''],
      unit: [''],
      discount: [''],
      discountEndDate: ['']
    });
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  loadProducts() {
    this.loading = true;
    this.productsService.getProducts(this.filters).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load products');
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.toastr.error('Failed to load categories');
      }
    });
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex = index;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOverIndex = null;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex = null;
    if (event.dataTransfer && event.dataTransfer.files.length) {
      this.onImageUpload({ target: { files: event.dataTransfer.files } }, index);
    }
  }

  onImageUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.imageErrors[index] = 'Invalid file type. Please upload PNG, JPEG, or GIF.';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.imageErrors[index] = 'File is too large. Maximum size is 2MB.';
      return;
    }

    this.imageProgress[index] = 30;
    this.productsService.uploadProductImage(file).subscribe({
      next: (response) => {
        this.images.at(index).setValue(response.url);
        this.imageProgress[index] = 100;
        this.imageErrors[index] = '';
      },
      error: (error) => {
        this.imageErrors[index] = 'Failed to upload image. Please try again.';
        this.imageProgress[index] = 0;
      }
    });
  }

  removeImage(index: number) {
    this.images.at(index).setValue('');
    this.imageErrors[index] = '';
    this.imageProgress[index] = 0;
  }

  openModal(content: any, product?: Product) {
    this.isEditing = !!product;
    this.selectedProductId = product?.id || null;

    if (product) {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
        images: product.images,
        isActive: product.isActive,
        sku: product.sku,
        weight: product.weight,
        unit: product.unit,
        discount: product.discount,
        discountEndDate: product.discountEndDate
      });
    } else {
      this.productForm.reset({ isActive: true });
    }

    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    const productData = this.productForm.value;
    this.loading = true;

    if (this.isEditing && this.selectedProductId) {
      this.productsService.updateProduct(this.selectedProductId, productData).subscribe({
        next: () => {
          this.toastr.success('Product updated successfully');
          this.modalService.dismissAll();
          this.loadProducts();
        },
        error: (error) => {
          this.toastr.error('Failed to update product');
          this.loading = false;
        }
      });
    } else {
      this.productsService.createProduct(productData).subscribe({
        next: () => {
          this.toastr.success('Product created successfully');
          this.modalService.dismissAll();
          this.loadProducts();
        },
        error: (error) => {
          this.toastr.error('Failed to create product');
          this.loading = false;
        }
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error: (error) => {
          this.toastr.error('Failed to delete product');
          this.loading = false;
        }
      });
    }
  }

  applyFilters() {
    this.loadProducts();
    this.showFilters = false;
  }

  resetFilters() {
    this.filters = {};
    this.loadProducts();
    this.showFilters = false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
} 
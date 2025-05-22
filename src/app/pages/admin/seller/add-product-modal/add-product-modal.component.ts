import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SellersService } from 'src/app/services/seller/sellers/sellers.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnChanges, OnInit {
  @Input() product: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<void>();
  productForm!: FormGroup;
  isLoading = false;
  categories: any[] = [];
  storageTypes = [
    { id: 'frozen', name: 'Frozen' },
    { id: 'fresh', name: 'Fresh' },
    { id: 'chilled', name: 'Chilled' },
    { id: 'canned', name: 'Canned' }
  ];

  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  dragOverIndex: number | null = null;
  imageErrors: string[] = ['', '', '', '', ''];
  imageProgress: number[] = [0, 0, 0, 0, 0];

  constructor(
    private fb: FormBuilder,
    private sellersService: SellersService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.initForm();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.categories = []
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.patchFormForEdit();
    } else if (changes['product'] && !this.product) {
      this.productForm.reset();
      this.imageUrls.clear();
      this.addImageUrl();
    }
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      imageUrls: this.fb.array([this.fb.control('', [Validators.required])]),
      description: ['', [Validators.maxLength(500)]],
      categoryId: ['', Validators.required],
      storageType: ['', Validators.required],
      alertQuantity: ['', [Validators.min(0)]]
    });
  }

  private patchFormForEdit() {
    if (!this.product) return;
    this.productForm.patchValue({
      name: this.product.name || '',
      unitPrice: this.product.unitPrice || '',
      availableQuantity: this.product.availableQuantity || '',
      description: this.product.description || '',
      categoryId: this.product.categoryId || '',
      storageType: this.product.storageType || '',
      alertQuantity: this.product.alertQuantity || ''
    });
    
    this.imageUrls.clear();
    this.product.imageUrls.forEach(() => this.addImageUrl());
  }

  get imageUrls() {
    return this.productForm.get('imageUrls') as FormArray;
  }

  addImageUrl() {
    this.imageUrls.push(this.fb.control('', [Validators.required]));
  }

  removeImageUrl(index: number) {
    this.imageUrls.at(index).setValue('');
    this.imageErrors[index] = '';
    this.imageProgress[index] = 0;
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

  moveImageUrl(from: number, to: number) {
    if (to < 0 || to >= this.imageUrls.length) return;
    const fromValue = this.imageUrls.at(from).value;
    const toValue = this.imageUrls.at(to).value;
    this.imageUrls.at(from).setValue(toValue);
    this.imageUrls.at(to).setValue(fromValue);
    // Swap errors and progress as well
    [this.imageErrors[from], this.imageErrors[to]] = [this.imageErrors[to], this.imageErrors[from]];
    [this.imageProgress[from], this.imageProgress[to]] = [this.imageProgress[to], this.imageProgress[from]];
  }

  onImageUpload(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;
    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      this.imageErrors[index] = 'Invalid file type.';
      return;
    }
    // Validate size (e.g., 2MB max)
    if (file.size > 2 * 1024 * 1024) {
      this.imageErrors[index] = 'File is too large (max 2MB).';
      return;
    }
    // Optionally validate dimensions (800x400)
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 800 || img.height > 400) {
          this.imageErrors[index] = 'Image must be max 800x400px.';
          return;
        }
        this.imageErrors[index] = '';
        this.imageProgress[index] = 100;
        // Simulate upload and set value
        this.imageUrls.at(index).setValue(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    // Simulate progress
    this.imageProgress[index] = 30;
    setTimeout(() => this.imageProgress[index] = 60, 200);
    setTimeout(() => this.imageProgress[index] = 100, 400);
  }

  submit() {
    if (this.productForm.invalid) {
      this.toastr.error('Please fill out all required fields.');
      return;
    }

    this.isLoading = true;
    const formData = this.productForm.value;
    // Adjust the payload format to fit your backend API

    if (this.product) {
      // Handle edit logic
      this.sellersService.updateProduct(this.product.id, formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Product updated successfully!');
          this.productAdded.emit();
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Error updating product');
        }
      });
    } else {
      // Handle create logic
      this.sellersService.createProduct(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Product added successfully!');
          this.productAdded.emit();
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Error adding product');
        }
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}

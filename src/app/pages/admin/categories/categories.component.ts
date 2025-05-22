import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../../services/categories/categories.service';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  showAddCategoryModal = false;
  categoryForm!: FormGroup;
  dragOverIndex: number | null = null;
  imageErrors: string[] = ['', '', '', '', ''];
  imageProgress: number[] = [0, 0, 0, 0, 0];
  isLoading = false;
  isEditing = false;
  selectedCategoryId: string | null = null;
  loading = false;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.initCategoryForm();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrls: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ])
    });
  }

  get imageUrls() {
    return this.categoryForm.get('imageUrls') as FormArray;
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
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      this.imageErrors[index] = 'Invalid file type.';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.imageErrors[index] = 'File is too large (max 2MB).';
      return;
    }
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
        this.imageUrls.at(index).setValue(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    this.imageProgress[index] = 30;
    setTimeout(() => this.imageProgress[index] = 60, 200);
    setTimeout(() => this.imageProgress[index] = 100, 400);
  }

  removeImageUrl(index: number) {
    this.imageUrls.at(index).setValue('');
    this.imageErrors[index] = '';
    this.imageProgress[index] = 0;
  }

  closeCategoryModal() {
    this.showAddCategoryModal = false;
    this.categoryForm.reset();
    this.imageErrors = ['', '', '', '', ''];
    this.imageProgress = [0, 0, 0, 0, 0];
  }

  submitCategory() {
    if (this.categoryForm.invalid) return;
    this.isLoading = true;
    // TODO: Call your category service to submit the form
    setTimeout(() => {
      this.isLoading = false;
      this.closeCategoryModal();
      // Show success toast/snackbar here
    }, 1000);
  }

  loadCategories(): void {
    this.loading = true;
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load categories');
        this.loading = false;
      }
    });
  }

  openModal(content: any, category?: Category): void {
    this.isEditing = !!category;
    this.selectedCategoryId = category?.id || null;
    
    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
        imageUrls: category.imageUrls || [category.image || '', '', '', '', ''],
        isActive: category.isActive
      });
    } else {
      this.categoryForm.reset({ isActive: true });
    }

    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData = this.categoryForm.value;
    this.loading = true;

    if (this.isEditing && this.selectedCategoryId) {
      this.categoriesService.updateCategory(this.selectedCategoryId, categoryData).subscribe({
        next: () => {
          this.toastr.success('Category updated successfully');
          this.modalService.dismissAll();
          this.loadCategories();
        },
        error: (error) => {
          this.toastr.error('Failed to update category');
          this.loading = false;
        }
      });
    } else {
      this.categoriesService.createCategory(categoryData).subscribe({
        next: () => {
          this.toastr.success('Category created successfully');
          this.modalService.dismissAll();
          this.loadCategories();
        },
        error: (error) => {
          this.toastr.error('Failed to create category');
          this.loading = false;
        }
      });
    }
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.loading = true;
      this.categoriesService.deleteCategory(id).subscribe({
        next: () => {
          this.toastr.success('Category deleted successfully');
          this.loadCategories();
        },
        error: (error) => {
          this.toastr.error('Failed to delete category');
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.categoryForm.controls;
  }
} 